export const storeAlert = (set) => ({
  StateAlert: false,
  TitleAlert: "",
  TypeAlert: "succes",
  ChangeStateAlert: (value) => set({ StateAlert: value }),
  ChangeTitleAlert: (value) => set({ TitleAlert: value }),
  ChangeTypeAlert: (value) => set({ TypeAlert: value }),
});
