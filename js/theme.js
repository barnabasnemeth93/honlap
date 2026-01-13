const STORAGE_KEY = "zv_theme"; // "light" | "dark"

export function applyInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = (saved === "dark" || saved === "light") ? saved : "light"; // alap: világos
  setTheme(theme);
}

export function setTheme(theme) {
  const root = document.documentElement; // <html>
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme"); // light = default
  localStorage.setItem(STORAGE_KEY, theme);
  syncThemeButton(theme);
}

export function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
}

export function bindThemeUI() {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.addEventListener("click", toggleTheme);

  // első szinkron (ha már applyInitialTheme lefutott)
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  syncThemeButton(isDark ? "dark" : "light");
}

function syncThemeButton(theme) {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}
