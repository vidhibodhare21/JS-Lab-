const form = document.getElementById('scholarshipForm');
const marksInput = document.getElementById('marks');
const resultBox = document.getElementById('result');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const marks = Number(marksInput.value);

  if (!Number.isInteger(marks) || marks < 0 || marks > 100) {
    resultBox.textContent = 'Please enter a valid whole number from 0 to 100.';
    resultBox.style.background = '#ffe6e6';
    resultBox.style.color = '#8b1e1e';
    return;
  }

  let scholarship;

  if (marks < 50) {
    scholarship = 'Not Eligible';
  } else if (marks < 70) {
    scholarship = 'Bronze';
  } else if (marks < 85) {
    scholarship = 'Silver';
  } else if (marks < 95) {
    scholarship = 'Gold';
  } else {
    scholarship = 'Platinum';
  }

  resultBox.textContent = `Your scholarship level is: ${scholarship}`;
  resultBox.style.background = '#f8ebd8';
  resultBox.style.color = '#4f3a20';
});
