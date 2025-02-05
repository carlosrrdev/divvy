type theme = "light" | "dark" | "system";

export const themeStore = {
  theme: "system" as theme,
  showDropdown: false,
  init() {
    this.theme = (localStorage.getItem("theme") as theme) || "system";
    this.setTheme(this.theme);
  },
  setTheme(theme: theme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      this.theme = systemTheme;
      localStorage.removeItem("theme");
      this.showDropdown = false;
      return;
    }
    localStorage.setItem("theme", theme);
    this.theme = theme;
    root.classList.add(theme);
    this.showDropdown = false;
  },
  toggleDropdown(show = false) {
    this.showDropdown = show;
  }
};
