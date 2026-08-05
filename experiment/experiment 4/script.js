/**
 * @typedef {(text: string) => boolean} CheckFn
 */

const app = (() => {
  const root = document.getElementById("checker-form");
  const input = document.getElementById("text-input");
  const result = document.getElementById("result");

  /**
   * Normalize text by removing non-alphanumeric characters and lowercasing.
   * @param {string} text
   * @returns {string}
   */
  const normalize = (text) => text.replace(/[^a-z0-9]+/gi, "").toLowerCase();

  /**
   * Create a palindrome checker function.
   * @returns {CheckFn}
   */
  const createPalindromeChecker = () => {
    return (text) => {
      const cleaned = normalize(text);
      const reversed = cleaned.split("").reverse().join("");
      return cleaned !== "" && cleaned === reversed;
    };
  };

  const checkPalindrome = createPalindromeChecker();

  const showMessage = (message, isError = false) => {
    result.textContent = message;
    result.classList.toggle("error", isError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rawValue = input.value;

    try {
      if (typeof rawValue !== "string") {
        throw new TypeError("Input must be text.");
      }

      const isPalindrome = checkPalindrome(rawValue);
      if (isPalindrome) {
        showMessage(`✅ "${rawValue.trim()}" is a palindrome.`);
      } else {
        showMessage(`❌ "${rawValue.trim()}" is not a palindrome.`, false);
      }
    } catch (error) {
      showMessage(error.message || "Something went wrong.", true);
      console.error(error);
    }
  };

  if (root) {
    root.addEventListener("submit", handleSubmit);
  }

  return {
    checkPalindrome,
    normalize,
  };
})();
