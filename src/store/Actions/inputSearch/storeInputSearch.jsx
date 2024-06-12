export const storeInputSearch = (set) => ({
  FilterCoincidenceHome: [],

  FilterCoincidencePageNftCollection: [],
  FilterPageNftCollectionObj: [],
  FilterCoincidencePageNftVariousCategories: {},
  FilterCoincidenceProfileUserFollowers: [],
  FilterCoincidenceProfileUserFollowings: [],
  FilterCoincidenceExploreNft: [],
  FilterCoincidenceExploreCollections: [],
  FilterCoincidenceExploreUsers: [],

  ChangeFilterCoincidenceHome: (value) => set({ FilterCoincidenceHome: value }),
  ChangeFilterCoincidencePageNftCollection: (value) =>
    set({ FilterCoincidencePageNftCollection: value }),
  ChangeFilterPageNftCollectionObj: (value) =>
    set({ FilterPageNftCollectionObj: value }),
  ChangeFilterCoincidencePageNftVariousCategories: (value) =>
    set({ FilterCoincidencePageNftVariousCategories: value }),
  ChangeFilterCoincidenceProfileUserFollowers: (value) =>
    set({ FilterCoincidenceProfileUserFollowers: value }),
  ChangeFilterCoincidenceProfileUserFollowings: (value) =>
    set({ FilterCoincidenceProfileUserFollowings: value }),
  ChangeFilterCoincidenceExploreNft: (value) =>
    set({ FilterCoincidenceExploreNft: value }),
  ChangeFilterCoincidenceExploreCollections: (value) =>
    set({ FilterCoincidenceExploreCollections: value }),
  ChangeFilterCoincidenceExploreUsers: (value) =>
    set({ FilterCoincidenceExploreUsers: value }),
});
