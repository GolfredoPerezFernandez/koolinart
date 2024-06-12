export const storeCollection = (set) => ({
  CollectionEthAddress: "",
  CollectionData: [],
  CollectionOnSale: [],
  TotalCollectionOnSale: 0,
  CollectionOwned: [],
  TotalCollectionOwned: 0,

  ChangeCollectionEthAddress: (value) => set({ CollectionEthAddress: value }),
  ChangeCollectionData: (value) => set({ CollectionData: value }),
  ChangeCollectionOnSale: (value) => set({ CollectionOnSale: value }),
  ChangeTotalCollectionOnSale: (value) => set({ TotalCollectionOnSale: value }),
  ChangeCollectionOwned: (value) => set({ CollectionOwned: value }),
  ChangeTotalCollectionOwned: (value) => set({ TotalCollectionOwned: value }),
});
