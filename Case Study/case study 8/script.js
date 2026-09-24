const form = document.querySelector("#application-form");
const message = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const resumeInput = document.querySelector("#resume");
const fileLabel = document.querySelector("#file-label");
const successMessage = document.querySelector("#success-message");

message.addEventListener("input", () => {
  characterCount.textContent = `${message.value.length} / 500`;
});

resumeInput.addEventListener("change", () => {
  fileLabel.textContent =
    resumeInput.files[0]?.name ||
    "Choose a PDF, DOC, or DOCX file";
});

function setError(fieldId, errorText) {
  const field = document.querySelector(`#${fieldId}`);
  const error = document.querySelector(`#${fieldId}-error`);

  field.classList.toggle("invalid", Boolean(errorText));
  field.setAttribute("aria-invalid", Boolean(errorText));
  error.textContent = errorText;
}

function validateForm() {
  const name = document.querySelector("#full-name");
  const email = document.querySelector("#email");
  const location = document.querySelector("#location");
  const workArrangement = document.querySelector("#work-arrangement");
  const role = document.querySelector("#role");
  const experience = document.querySelector("#experience");
  const authorization = document.querySelector(
    'input[name="authorization"]:checked'
  );
  const consent = document.querySelector("#consent");

  setError(
    "full-name",
    name.value.trim() ? "" : "Please enter your full name."
  );

  setError(
    "email",
    email.validity.valid ? "" : "Please enter a valid email address."
  );

  setError(
    "location",
    location.value.trim()
      ? ""
      : "Please enter your current location."
  );

  setError(
    "work-arrangement",
    workArrangement.value
      ? ""
      : "Please select a work arrangement."
  );

  setError(
    "role",
    role.value ? "" : "Please select a role."
  );

  setError(
    "experience",
    experience.value
      ? ""
      : "Please select your experience level."
  );

  setError(
    "resume",
    resumeInput.files.length
      ? ""
      : "Please attach your resume."
  );

  setError(
    "message",
    message.value.trim()
      ? ""
      : "Please add a short note."
  );

  setError(
    "authorization",
    authorization ? "" : "Please select an option."
  );

  setError(
    "consent",
    consent.checked
      ? ""
      : "Please agree before submitting."
  );

  return form.querySelectorAll(".invalid").length === 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.hidden = true;

  if (!validateForm()) {
    form.querySelector(".invalid")?.focus();
    return;
  }

  successMessage.hidden = false;
  successMessage.focus();

  form.reset();

  fileLabel.textContent = "Choose a PDF, DOC, or DOCX file";
  characterCount.textContent = "0 / 500";
});
