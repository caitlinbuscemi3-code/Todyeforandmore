/* =====================================================================
   FORMS — checks what people type & handles "Submit"
   ---------------------------------------------------------------------
   Used by: Custom Orders, Team/Bulk Orders, Contact and Leave a Review forms.

   What it does:
     • Shows a friendly error under any field that's missing or wrong
     • Checks emails, phone numbers, dates, and uploaded photo files
     • On success, sends the form (if you've set up a form service in
       config.js → forms) and shows a "Thank you!" message

   BACKEND HOOK: form delivery is controlled from config.js → forms.
   While those are empty (""), forms work visually but nothing is sent.
   ===================================================================== */

(function () {
  "use strict";

  var Site = (window.Site = window.Site || {});
  var CONFIG = window.SITE_CONFIG || {};

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var ALLOWED_FILE_TYPES = /^(image\/(jpeg|png|gif|webp|heic|heif)|application\/pdf)$/i;
  var ALLOWED_FILE_EXT = /\.(jpe?g|png|gif|webp|heic|heif|pdf)$/i;

  /* ---------- Where to show each field's error message ---------- */
  function errorEl(field) {
    var wrap = field.closest(".field");
    if (!wrap) return null;
    var el = wrap.querySelector(".field-error");
    if (!el) {
      el = document.createElement("p");
      el.className = "field-error";
      el.id = (field.id || field.name || "f" + Math.random().toString(36).slice(2)) + "-error";
      el.setAttribute("aria-live", "polite");
      wrap.appendChild(el);
    }
    var describedBy = (field.getAttribute("aria-describedby") || "").split(" ");
    if (describedBy.indexOf(el.id) === -1) {
      field.setAttribute("aria-describedby", describedBy.concat(el.id).join(" ").trim());
    }
    return el;
  }

  function labelFor(field) {
    var wrap = field.closest(".field");
    var label = wrap && wrap.querySelector("label, legend");
    return label ? label.textContent.replace("*", "").trim().toLowerCase() : "this field";
  }

  /* ---------- The rules: returns an error message, or "" if OK ---------- */
  function checkField(field) {
    var value = (field.value || "").trim();
    var type = field.type;

    // Group of checkboxes where at least one must be ticked
    if (field.matches("fieldset[data-required-group]")) {
      return field.querySelector("input:checked") ? "" : (field.getAttribute("data-error") || "Please choose at least one option.");
    }
    if (type === "checkbox") {
      return field.required && !field.checked ? (field.getAttribute("data-error") || "Please check this box to continue.") : "";
    }
    if (type === "radio") return "";

    if (type === "file") return checkFiles(field);

    if (field.required && !value) {
      if (field.tagName === "SELECT") return "Please choose an option.";
      if (field.getAttribute("data-error")) return field.getAttribute("data-error");
      if (field.tagName === "TEXTAREA") return "Please fill in this field.";
      if (type === "date") return "Please choose a date.";
      if (type === "number") return "Please enter a number.";
      var label = labelFor(field); // e.g. "email" -> "Please enter your email."
      return "Please enter " + (/^your /.test(label) ? label : "your " + label) + ".";
    }
    if (!value) return ""; // optional & empty = fine

    if (type === "email" && !EMAIL_RE.test(value)) return "Please enter a valid email (like name@example.com).";

    if (type === "tel") {
      var digits = value.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) return "Please enter a valid phone number, including area code.";
    }

    if (field.minLength > 0 && value.length < field.minLength) {
      return "Please add a little more detail (at least " + field.minLength + " characters).";
    }

    if (type === "number") {
      var n = Number(value);
      if (isNaN(n)) return "Please enter a number.";
      if (field.min !== "" && n < Number(field.min)) return field.getAttribute("data-error-min") || "Please enter at least " + field.min + ".";
      if (field.max !== "" && n > Number(field.max)) return "Please enter " + field.max + " or less.";
    }

    // Dates that must be in the future, e.g. data-min-days="7" = at least a week out
    if (type === "date" && field.hasAttribute("data-min-days")) {
      var minDays = Number(field.getAttribute("data-min-days")) || 0;
      var chosen = new Date(value + "T00:00:00");
      var earliest = new Date(); earliest.setHours(0, 0, 0, 0); earliest.setDate(earliest.getDate() + minDays);
      if (isNaN(chosen.getTime())) return "Please enter a valid date.";
      if (chosen < earliest) {
        return field.getAttribute("data-error-date") ||
          (minDays ? "Please choose a date at least " + minDays + " days from today." : "Please choose a future date.");
      }
    }

    if (field.pattern && !new RegExp("^(?:" + field.pattern + ")$").test(value)) {
      return field.getAttribute("data-error") || "Please check the format of this field.";
    }
    return "";
  }

  // Reference-photo uploads: file count, size, and type
  function checkFiles(input) {
    var files = Array.prototype.slice.call(input.files || []);
    var maxFiles = Number(input.getAttribute("data-max-files") || 10);
    var maxMB = Number(input.getAttribute("data-max-mb") || 10);
    if (input.required && !files.length) return "Please upload at least one file.";
    if (files.length > maxFiles) return "Please upload up to " + maxFiles + " files.";
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      if (!ALLOWED_FILE_TYPES.test(f.type) && !ALLOWED_FILE_EXT.test(f.name)) return '"' + f.name + '" isn\'t a photo or PDF. Please use JPG, PNG, HEIC, or PDF.';
      if (f.size > maxMB * 1024 * 1024) return '"' + f.name + '" is too large (max ' + maxMB + " MB per file).";
    }
    return "";
  }

  function validateField(field) {
    var message = checkField(field);
    var el = errorEl(field);
    if (el) el.textContent = message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    return !message;
  }

  function fieldsOf(form) {
    return Array.prototype.slice.call(
      form.querySelectorAll("input:not([type=hidden]):not([name=_gotcha]), select, textarea, fieldset[data-required-group]")
    ).filter(function (f) { return !f.disabled && !f.closest("[hidden]"); });
  }

  // Checks every field; returns true if the whole form is OK
  function validateForm(form) {
    var firstBad = null;
    fieldsOf(form).forEach(function (f) {
      if (!validateField(f) && !firstBad) firstBad = f;
    });
    var alert = form.querySelector(".form-alert");
    if (alert) {
      alert.hidden = !firstBad;
      alert.textContent = firstBad ? "Almost there! Please fix the highlighted fields below." : "";
    }
    if (firstBad) {
      var focusTarget = firstBad.matches("fieldset") ? firstBad.querySelector("input") : firstBad;
      focusTarget.focus({ preventScroll: true });
      focusTarget.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return !firstBad;
  }

  // Leaving a field by tapping something else (like a checkbox) fires "blur" while the
  // finger or mouse is still down. Showing an error message right then pushes the page
  // down, and the tap lands in the wrong spot. So while a press is in progress, we wait
  // until it's finished before showing the message.
  var pressing = false, waiting = [];
  document.addEventListener("pointerdown", function () { pressing = true; }, true);
  function finishPress() {
    pressing = false;
    var fields = waiting; waiting = [];
    setTimeout(function () { fields.forEach(validateField); }, 0); // after the click lands
  }
  document.addEventListener("pointerup", finishPress, true);
  document.addEventListener("pointercancel", finishPress, true);

  // Re-check a field as soon as the visitor leaves it or fixes it
  function attachLiveValidation(form) {
    form.setAttribute("novalidate", ""); // use our friendly messages instead of the browser's
    form.addEventListener("blur", function (e) {
      var f = e.target;
      if (!f.matches("input, select, textarea") || f.type === "checkbox" || f.type === "radio" || f.type === "file") return;
      if (pressing) { if (waiting.indexOf(f) === -1) waiting.push(f); }
      else validateField(f);
    }, true);
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") validateField(e.target);
    });
    form.addEventListener("change", function (e) {
      var f = e.target;
      var group = f.closest("fieldset[data-required-group]");
      if (group) validateField(group);
      else if (f.type === "checkbox" || f.type === "file" || f.tagName === "SELECT") validateField(f);
    });
  }

  /* ---------- File upload box: shows chosen file names + drag & drop ---------- */
  function setupUploads(root) {
    root.querySelectorAll(".upload").forEach(function (box) {
      var input = box.querySelector('input[type="file"]');
      var list = box.querySelector(".upload__list");
      function refresh() {
        var files = Array.prototype.slice.call(input.files || []);
        list.innerHTML = files.map(function (f) { return "<li>" + Site.icon("paperclip") + Site.escape(f.name) + "</li>"; }).join("");
      }
      input.addEventListener("change", refresh);
      ["dragenter", "dragover"].forEach(function (ev) { box.addEventListener(ev, function () { box.classList.add("is-dragover"); }); });
      ["dragleave", "drop"].forEach(function (ev) { box.addEventListener(ev, function () { box.classList.remove("is-dragover"); }); });
      input.form && input.form.addEventListener("reset", function () { setTimeout(refresh, 0); });
    });
  }

  /* ---------- Sending the form ---------- */
  function sendForm(form, endpoint) {
    /* ============================================================
       BACKEND HOOK
       If config.js → forms has a URL for this form, the form data
       (including uploaded photos) is POSTed there. Works out of the
       box with Formspree, Basin, Getform, and similar services.
       If you'd rather use Netlify Forms, add  data-netlify="true"
       to the <form> tag and leave the config URL empty.
       ============================================================ */
    if (!endpoint) {
      // No service connected yet → pretend it worked so you can test the flow.
      console.info("[DEMO] Form '" + form.id + "' is valid. Connect a form service in config.js → forms to receive it.",
        Object.fromEntries(new FormData(form).entries()));
      return new Promise(function (resolve) { setTimeout(resolve, 700); });
    }
    return fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (res) {
      if (res.ok) return;
      return res.text().then(function (body) {
        throw new Error("Form service responded with " + res.status + ": " + body);
      });
    });
  }

  function setupManagedForm(form) {
    var key = form.getAttribute("data-form"); // matches a name in config.js → forms
    var endpoint = (CONFIG.forms || {})[key] || "";
    var success = document.querySelector('[data-success-for="' + form.id + '"]');
    var submitBtn = form.querySelector('[type="submit"]');
    var btnText = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      // Spam trap: the hidden "_gotcha" field is sent along, and Formspree quietly
      // discards anything a bot filled in. (We don't stop it here, so a real person
      // whose browser autofills it by mistake never gets stuck on a button that does nothing.)

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      sendForm(form, endpoint)
        .then(function () {
          form.reset();
          form.hidden = true;
          if (success) {
            success.hidden = false;
            success.scrollIntoView({ behavior: "smooth", block: "center" });
            success.focus && success.focus();
          }
        })
        .catch(function (err) {
          console.error(err);
          var alert = form.querySelector(".form-alert");
          if (alert) {
            alert.hidden = false;
            alert.textContent = "Sorry — something went wrong sending your request. Please try again, or email us at " +
              ((CONFIG.contact || {}).email || "our email") + ".";
          }
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = btnText;
        });
    });

    // "Send another" button inside the thank-you box
    if (success) {
      var again = success.querySelector("[data-form-again]");
      if (again) again.addEventListener("click", function () {
        success.hidden = true;
        form.hidden = false;
        form.querySelector("input, select, textarea").focus();
      });
    }
  }

  /* ---------- Share with other scripts (the Team & Bulk page uses these) ---------- */
  Site.Forms = { validateForm: validateForm, validateField: validateField };

  /* ---------- Turn on for every form on the page ---------- */
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    attachLiveValidation(form);
    setupUploads(form);
    if (form.hasAttribute("data-form")) setupManagedForm(form);
  });

  // Today's date as the earliest pickable date on date fields
  document.querySelectorAll('input[type="date"][data-min-days]').forEach(function (input) {
    var d = new Date();
    d.setDate(d.getDate() + (Number(input.getAttribute("data-min-days")) || 0));
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    input.min = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  });
})();
