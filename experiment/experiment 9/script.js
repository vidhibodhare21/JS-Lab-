const STORAGE_KEY = "quiet-desk-preferences";
const SESSION_KEY = "quiet-desk-session";
const defaults = { userName: "", theme: "linen", textSize: "comfortable", reduceMotion: false };

const form = document.querySelector("#preferencesForm");
const savedMessage = document.querySelector("#savedMessage");
const storageStatus = document.querySelector("#storageStatus");
const storedUserName = document.querySelector("#storedUserName");
const preferenceStorageStatus = document.querySelector("#preferenceStorageStatus");
const sessionStorageStatus = document.querySelector("#sessionStorageStatus");
const sessionCopy = document.querySelector("#sessionCopy");
const resetButton = document.querySelector("#resetButton");
const sessionButton = document.querySelector("#sessionButton");

function readPreferences() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...defaults };
  }
}

function applyPreferences(preferences) {
  form.elements.userName.value = preferences.userName;
  document.documentElement.dataset.theme = preferences.theme;
  document.documentElement.dataset.textSize = preferences.textSize;
  document.body.classList.toggle("reduced-motion", preferences.reduceMotion);
  form.elements.theme.value = preferences.theme;
  form.elements.textSize.value = preferences.textSize;
  form.elements.reduceMotion.checked = preferences.reduceMotion;
}

function currentPreferences() {
  return {
    userName: form.elements.userName.value.trim(),
    theme: form.elements.theme.value,
    textSize: form.elements.textSize.value,
    reduceMotion: form.elements.reduceMotion.checked
  };
}

function savePreferences() {
  const preferences = currentPreferences();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ lastChanged: new Date().toISOString() }));
  applyPreferences(preferences);
  savedMessage.textContent = "Saved locally";
  storageStatus.textContent = "Preferences saved";
  updateStorageInformation();
}

function updateStorageInformation() {
  const savedPreferences = localStorage.getItem(STORAGE_KEY);
  let savedName = "";

  try {
    savedName = savedPreferences ? JSON.parse(savedPreferences).userName || "" : "";
  } catch {
    savedName = "";
  }

  storedUserName.textContent = savedName || "Not set";
  preferenceStorageStatus.textContent = savedPreferences ? "Saved in local storage" : "No preferences saved";
  sessionStorageStatus.textContent = sessionStorage.getItem(SESSION_KEY) ? "Active for this session" : "No active session data";
}

function restoreSession() {
  const hasSession = sessionStorage.getItem(SESSION_KEY);
  sessionCopy.textContent = hasSession ? "Your preferences are restored for this session." : "This session is fresh.";
  sessionButton.textContent = hasSession ? "Refresh session" : "Start session";
  updateStorageInformation();
}

form.addEventListener("input", savePreferences);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  savePreferences();
});
resetButton.addEventListener("click", () => {
  applyPreferences(defaults);
  savePreferences();
  sessionCopy.textContent = "Preferences reset for this session.";
});
sessionButton.addEventListener("click", () => {
  savePreferences();
  sessionCopy.textContent = "Your preferences are ready for this session.";
  sessionButton.textContent = "Refresh session";
});

applyPreferences(readPreferences());
restoreSession();
