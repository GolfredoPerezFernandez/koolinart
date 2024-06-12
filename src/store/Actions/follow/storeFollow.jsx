export const storeFollow = (set) => ({
  Followers: true,
  WatchFollow: false,
  FollowerOrFollowing: [],
  FollowerOrFollowingArtist: [],
  ProfileUserFollowerOrFollowing: [],
  ProfileArtistFollowerOrFollowing: [],
  TotalProfileFollowerOrFollowingArtist: 0,

  FilterOptionsFollower: [],
  FilterOptionsFollowings: [],
  FilterOptionsFollowingsArtist: [],
  ActiveFollower: true,
  TotalFollowerOrFollowing: 0,

  ChangeFollowers: (value) => set({ Followers: value }),
  ChangeWatchFollow: (value) => set({ WatchFollow: value }),
  ChangeFollowerOrFollowing: (value) => set({ FollowerOrFollowing: value }),
  ChangeProfileArtistFollowerOrFollowing: (value) =>
    set({ ProfileArtistFollowerOrFollowing: value }),
  ChangeFollowerOrFollowingArtist: (value) =>
    set({ FollowerOrFollowingArtist: value }),
  ChangeTotalProfileFollowerOrFollowingArtist: (value) =>
    set({ TotalProfileFollowerOrFollowingArtist: value }),
  ChangeProfileUserFollowerOrFollowing: (value) =>
    set({ ProfileUserFollowerOrFollowing: value }),
  ChangeFilterOptionsFollower: (value) => set({ FilterOptionsFollower: value }),
  ChangeFilterOptionsFollowings: (value) =>
    set({ FilterOptionsFollowings: value }),
  ChangeFilterOptionsFollowingsArtist: (value) =>
    set({ FilterOptionsFollowingsArtist: value }),
  ChangeActiveFollower: (value) => set({ ActiveFollower: value }),
  ChangeTotalFollowerOrFollowing: (value) =>
    set({ TotalFollowerOrFollowing: value }),
});
