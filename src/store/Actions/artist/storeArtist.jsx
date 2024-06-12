export const storeArtist = (set) => ({
  ArtistEthAddress: "",
  ArtistData: [],
  ArtistOnSale: [],
  ArtistTotalOnSale: 0,
  ArtistOwned: [],
  ArtistTotalOwned: 0,
  ArtistCollection: [],
  ArtistTotalCollection: 0,
  ChangeArtistEthAddress: (value) => set({ ArtistEthAddress: value }),
  ChangeArtistData: (value) => set({ ArtistData: value }),
  ChangeArtistOnSale: (value) => set({ ArtistOnSale: value }),
  ChangeArtistTotalOnSale: (value) => set({ ArtistTotalOnSale: value }),
  ChangeArtistOwned: (value) => set({ ArtistOwned: value }),
  ChangeArtistTotalOwned: (value) => set({ ArtistTotalOwned: value }),
  ChangeArtistCollection: (value) => set({ ArtistCollection: value }),
  ChangeArtistTotalCollection: (value) => set({ ArtistTotalCollection: value }),
});