export const storeUserAndOwnNft = (set) => ({
  PageExploreUser: [],
  TotalPageExploreUser: 0,
  ProfileUserNftOnSale: [],
  TotalProfileUserNftOnSale: 0,
  ProfileUserNftOwned: [],
  TotalProfileUserNftOwned: 0,
  ProfileUserCollections: [],
  TotalProfileUserCollections: 0,
  ChangePageExploreUsers: (value) => set({ PageExploreUser: value }),
  ChangeTotalPageExploreUsers: (value) => set({ TotalPageExploreUser: value }),
  Change: (value) => set({ TotalPageExploreUser: value }),
  ChangeProfileUserNftOnSale: (value) => set({ ProfileUserNftOnSale: value }),
  ChangeTotalProfileUserNftOnSale: (value) =>
    set({ TotalProfileUserNftOnSale: value }),
  ChangeProfileUserNftOwned: (value) => set({ ProfileUserNftOwned: value }),
  ChangeTotalProfileUserNftOwned: (value) =>
    set({ TotalProfileUserNftOwned: value }),
  ChangeProfileUserCollections: (value) =>
    set({ ProfileUserCollections: value }),
  ChangeTotalProfileUserCollections: (value) =>
    set({ TotalProfileUserCollections: value }),
});
