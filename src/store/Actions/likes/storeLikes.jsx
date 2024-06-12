export const storeLikes = (set) => ({
  Likes: 0,

  ChangeLikes: (value) => set({ Likes: value }),
});
