const gradeForm = document.getElementById('gradeForm');
const resultBox = document.getElementById('result');

function validateMarks(value) {
  if (value === '' || value === null) {
    return 'empty';
  }

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return 'not-a-number';
  }

  if (!Number.isInteger(numeric) && value.toString().trim() !== '') {
    return 'not-integer';
  }

  if (numeric < 0 || numeric > 100) {
    return 'out-of-range';
  }

  return 'valid';
}

function getGrade(average) {
  if (average >= 90) {
    return 'A+';
  }
  if (average >= 80) {
    return 'A';
  }
  if (average >= 70) {
    return 'B';
  }
  if (average >= 60) {
    return 'C';
  }
  if (average >= 50) {
    return 'D';
  }
  return 'F';
}

function getRemarks(grade) {
  switch (grade) {
    case 'A+':
      return 'Outstanding performance!';
    case 'A':
      return 'Great work! Keep it up.';
    case 'B':
      return 'Good job. Aim a little higher.';
    case 'C':
      return 'You passed. Review the weak areas.';
    case 'D':
      return 'Below average. Put in extra practice.';
    default:
      return 'Needs improvement. Try again with stronger effort.';
  }
}

function showResult(html) {
  resultBox.innerHTML = html;
  resultBox.classList.remove('hidden');
}

function hideResult() {
  resultBox.textContent = '';
  resultBox.classList.add('hidden');
}

gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const marks = {
    Mathematics: document.getElementById('math').value.trim(),
    Science: document.getElementById('science').value.trim(),
    English: document.getElementById('english').value.trim(),
  };

  if (!name) {
    showResult('<p class="error">Please enter your name.</p>');
    return;
  }

  const errors = [];
  const numericMarks = {};

  for (const subject in marks) {
    const status = validateMarks(marks[subject]);
    if (status !== 'valid') {
      let message = `${subject} must be a whole number between 0 and 100.`;
      if (status === 'empty') {
        message = `${subject} cannot be empty.`;
      } else if (status === 'not-a-number' || status === 'not-integer') {
        message = `${subject} must be a valid whole number.`;
      } else if (status === 'out-of-range') {
        message = `${subject} should be between 0 and 100.`;
      }
      errors.push(message);
    } else {
      numericMarks[subject] = Number(marks[subject]);
    }
  }

  if (errors.length > 0) {
    showResult(`<p class="error">${errors.join('<br>')}</p>`);
    return;
  }

  const total = numericMarks.Mathematics + numericMarks.Science + numericMarks.English;
  const average = total / 3;
  const grade = getGrade(average);
  const remarks = getRemarks(grade);

  showResult(`
    <strong>${name}, your grade result is ready.</strong>
    <p>Total Marks: <strong>${total}</strong> / 300</p>
    <p>Average Score: <strong>${average.toFixed(2)}</strong></p>
    <p class="status">Final Grade: <strong>${grade}</strong></p>
    <p>${remarks}</p>
  `);
});
