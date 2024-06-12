export const storeTheme = (set) => ({
  ThemeModeState: "light",
  ChangeMode: (mode) =>
    set({ ThemeModeState: mode === "light" ? "dark" : "light" }),
});
