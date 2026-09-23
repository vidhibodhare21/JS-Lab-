const registrationForm = document.querySelector('#registrationForm');

const fullNameInput = document.querySelector('#fullName');
const prnInput = document.querySelector('#prn');
const ageInput = document.querySelector('#age');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const branchSelect = document.querySelector('#branch');
const topicSelect = document.querySelector('#topic');

const nameError = document.querySelector('#nameError');
const prnError = document.querySelector('#prnError');
const ageError = document.querySelector('#ageError');
const phoneError = document.querySelector('#phoneError');
const emailError = document.querySelector('#emailError');
const branchError = document.querySelector('#branchError');
const topicMessage = document.querySelector('#topicMessage');
const formStatus = document.querySelector('#formStatus');

function validateName() {
  if (!fullNameInput.value.trim()) {
    fullNameInput.classList.add('invalid');
    fullNameInput.classList.remove('valid');
    nameError.textContent = 'Please enter your full name.';
    return false;
  }

  fullNameInput.classList.remove('invalid');
  fullNameInput.classList.add('valid');
  nameError.textContent = '';
  return true;
}

function validatePrn() {
  const prnPattern = /^[a-zA-Z0-9-]+$/;

  if (!prnInput.value.trim() || !prnPattern.test(prnInput.value.trim())) {
    prnInput.classList.add('invalid');
    prnInput.classList.remove('valid');
    prnError.textContent = 'Please enter a valid PRN or roll number.';
    return false;
  }

  prnInput.classList.remove('invalid');
  prnInput.classList.add('valid');
  prnError.textContent = '';
  return true;
}

function validateAge() {
  const age = Number(ageInput.value);

  if (!ageInput.value || age < 15) {
    ageInput.classList.add('invalid');
    ageInput.classList.remove('valid');
    ageError.textContent = 'Age must be 15 or above.';
    return false;
  }

  ageInput.classList.remove('invalid');
  ageInput.classList.add('valid');
  ageError.textContent = '';
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.replace(/\D/g, '');

  if (phone.length !== 10) {
    phoneInput.classList.add('invalid');
    phoneInput.classList.remove('valid');
    phoneError.textContent = 'Please enter a valid 10-digit phone number.';
    return false;
  }

  phoneInput.classList.remove('invalid');
  phoneInput.classList.add('valid');
  phoneError.textContent = '';
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = emailInput.value.trim();

  if (!emailPattern.test(email)) {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailError.textContent = 'Please enter a valid email address.';
    return false;
  }

  emailInput.classList.remove('invalid');
  emailInput.classList.add('valid');
  emailError.textContent = '';
  return true;
}

function validateBranch() {
  if (!branchSelect.value) {
    branchSelect.classList.add('invalid');
    branchSelect.classList.remove('valid');
    branchError.textContent = 'Please select your branch.';
    return false;
  }

  branchSelect.classList.remove('invalid');
  branchSelect.classList.add('valid');
  branchError.textContent = '';
  return true;
}

fullNameInput.addEventListener('focus', () => {
  nameError.textContent = 'Enter your complete name.';
});

emailInput.addEventListener('focus', () => {
  emailError.textContent = 'Enter a valid email address.';
});

fullNameInput.addEventListener('blur', validateName);
prnInput.addEventListener('blur', validatePrn);
ageInput.addEventListener('blur', validateAge);
phoneInput.addEventListener('blur', validatePhone);
emailInput.addEventListener('blur', validateEmail);
branchSelect.addEventListener('change', validateBranch);

topicSelect.addEventListener('change', () => {
  const selectedTopic =
    topicSelect.options[topicSelect.selectedIndex].text;

  topicMessage.textContent = topicSelect.value
    ? `You selected: ${selectedTopic}.`
    : 'The change event will update this message.';
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isPrnValid = validatePrn();
  const isAgeValid = validateAge();
  const isPhoneValid = validatePhone();
  const isEmailValid = validateEmail();
  const isBranchValid = validateBranch();

  formStatus.className = 'form-status';

  if (
    !isNameValid ||
    !isPrnValid ||
    !isAgeValid ||
    !isPhoneValid ||
    !isEmailValid ||
    !isBranchValid
  ) {
    formStatus.textContent =
      'Please correct the highlighted fields and try again.';
    formStatus.classList.add('error');
    return;
  }

  formStatus.textContent =
    `Thanks, ${fullNameInput.value.trim()}! Your registration has been recorded.`;

  formStatus.classList.add('success');
});
