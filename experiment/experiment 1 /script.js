// External JavaScript file: script.js
console.info('External JS loaded.');

const user = {
  name: 'Vidhi Bodhare',
  email: 'vidhi.bodhare.batch2024@sitnagpur.siu.edu.in',
  role: 'Student'
};

function loadUserInfo() {
  console.log('Loading user information into the page.');

  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userRole').textContent = user.role;

  const welcomeText = `Welcome back, ${user.name}!`;
  document.getElementById('welcomeMessage').textContent = welcomeText;

  console.debug('User data object:', user);
}

function showInlineMessage() {
  // Inline JavaScript call from the button
  alert('This is an inline JavaScript action.');
  console.warn('Inline JS button clicked.');
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed.');
  loadUserInfo();
});
