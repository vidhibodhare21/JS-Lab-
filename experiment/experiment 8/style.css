const form = document.querySelector('#admission-form');
const statusMessage = document.querySelector('#form-status');
const startDate = document.querySelector('#start-date');
const age = document.querySelector('#age');

const fields = {
  fullName: {
    input: document.querySelector('#full-name'),
    message: document.querySelector('#full-name-message'),
    validate: (value) => value.trim().length >= 2 ? '' : 'Enter your full name.'
  },
  email: {
    input: document.querySelector('#email'),
    message: document.querySelector('#email-message'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address.'
  },
  phone: {
    input: document.querySelector('#phone'),
    message: document.querySelector('#phone-message'),
    validate: (value) => value.replace(/\D/g, '').length >= 10 ? '' : 'Enter at least 10 digits.'
  },
  age: {
    input: age,
    message: document.querySelector('#age-message'),
    validate: (value) => Number(value) >= 10 ? '' : 'You must be at least 10 years old.'
  },
  plan: {
    input: document.querySelector('#plan'),
    message: document.querySelector('#plan-message'),
    validate: (value) => value ? '' : 'Choose a membership plan.'
  },
  startDate: {
    input: startDate,
    message: document.querySelector('#start-date-message'),
    validate: (value) => value && value >= startDate.min ? '' : 'Choose today or a later date.'
  },
  consent: {
    input: document.querySelector('#consent'),
    message: document.querySelector('#consent-message'),
    validate: (value) => value ? '' : 'Please accept the membership terms.'
  }
};

function showFieldState(field, error) {
  const { input, message } = field;
  input.classList.toggle('is-invalid', Boolean(error));
  input.classList.toggle('is-valid', !error);
  input.setAttribute('aria-invalid', String(Boolean(error)));
  message.textContent = error;
}

function validateField(name) {
  const field = fields[name];
  const value = field.input.type === 'checkbox' ? field.input.checked : field.input.value;
  const error = field.validate(value);
  showFieldState(field, error);
  return !error;
}

const today = new Date().toISOString().split('T')[0];
startDate.min = today;

Object.keys(fields).forEach((name) => {
  const { input } = fields[name];
  input.addEventListener('input', () => validateField(name));
  input.addEventListener('change', () => validateField(name));
  input.addEventListener('blur', () => validateField(name));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = Object.keys(fields).every((name) => validateField(name));

  if (!isValid) {
    statusMessage.textContent = 'Please check the highlighted fields.';
    statusMessage.style.color = 'var(--error)';
    const firstInvalid = form.querySelector('.is-invalid');
    firstInvalid?.focus();
    return;
  }

  const memberName = fields.fullName.input.value.trim();
  statusMessage.textContent = `Thanks, ${memberName}. Your admission request is ready.`;
  statusMessage.style.color = 'var(--success)';
});
