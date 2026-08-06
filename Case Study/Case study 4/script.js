function reversePin(pin) {
  const pinText = String(pin).trim();
  return pinText.split("").reverse().join("");
}

const isPalindromePin = function (pin) {
  const pinText = String(pin).trim();
  return pinText === reversePin(pinText);
};

function createPinVerifier() {
  let securityMessage = "Security alert: palindrome PIN detected.";

  return function (pin) {
    const pinText = String(pin).trim();
    const reversedPin = reversePin(pinText);
    const isPalindrome = isPalindromePin(pinText);

    if (isPalindrome) {
      return `${securityMessage} Reversed PIN: ${reversedPin}`;
    }

    return `PIN is not a palindrome. Reversed PIN: ${reversedPin}`;
  };
}

const verifyPin = createPinVerifier();

const pinInput = document.getElementById("pin");
const resultBox = document.getElementById("result");

const displayResult = (message) => {
  resultBox.textContent = message;
  resultBox.style.display = "block";
};

document.getElementById("verifyBtn").addEventListener("click", () => {
  const pinValue = pinInput.value;

  if (!pinValue) {
    displayResult("Please enter a PIN first.");
    return;
  }

  const message = verifyPin(pinValue);
  displayResult(message);
});
