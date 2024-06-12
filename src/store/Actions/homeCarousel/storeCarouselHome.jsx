export const storeCarouselHome = (set) => ({
  CarouselInit: [],
  NftCarouselLive: [],
  CarouselTopSellers: [],
  NftCarouselExplore: [],
  CollectionCarousel: [],

  ChangeCarouselInit: (value) => set({ CarouselInit: value }),
  ChangeNftCarouselLive: (value) => set({ NftCarouselLive: value }),
  ChangeCarouselTopSellers: (value) => set({ CarouselTopSellers: value }),
  ChangeNftCarouselExplore: (value) => set({ NftCarouselExplore: value }),
  ChangeCollectionCarousel: (value) => set({ CollectionCarousel: value }),
});
