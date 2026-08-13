const arr = [100, 30, 25, 22];
const valueInput = document.getElementById('valueInput');
const arrayDisplay = document.getElementById('arrayDisplay');
const resultText = document.getElementById('resultText');

function updateArrayDisplay() {
  arrayDisplay.textContent = `[${arr.join(', ')}]`;
}

function calculateMaxMin() {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  resultText.textContent = `Max: ${max} & Min: ${min}`;
}

function getNumberFromInput() {
  const value = valueInput.value.trim();
  if (value === '') return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

document.querySelectorAll('.action-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = getNumberFromInput();

    if (action === 'push' && value !== null) {
      arr.push(value);
    }

    if (action === 'pop') {
      arr.pop();
    }

    if (action === 'unshift' && value !== null) {
      arr.unshift(value);
    }

    if (action === 'splice') {
      if (arr.length > 0) {
        const index = value !== null ? Math.floor(value) % arr.length : arr.length - 1;
        const validIndex = index < 0 ? arr.length + index : index;
        arr.splice(validIndex, 1);
      }
    }

    updateArrayDisplay();
    calculateMaxMin();
  });
});

document.getElementById('findMaxMinBtn').addEventListener('click', calculateMaxMin);

updateArrayDisplay();
calculateMaxMin();
