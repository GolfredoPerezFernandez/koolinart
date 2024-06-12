export const storeUser = (set) => ({
  UserRender: [],
  NftsPerfilUser: [],
  AmountKnrtUser: "",
  MaticBalance: "",
  LoginType: "",
  Authenticated: false,
  setUserRender: (value) => set({ UserRender: value }),
  setNftsPerfilUser: (value) => set({ NftsPerfilUser: value }),
  setAmountKnrtUser: (value) => set({ AmountKnrtUser: value }),
  setMaticBalance: (value) => set({ MaticBalance: value }),
  setLoginType: (value) => set({ LoginType: value }),
  setAuthenticated: (value) => set({ Authenticated: value }),
});
