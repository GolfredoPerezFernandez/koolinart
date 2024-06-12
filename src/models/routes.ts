export const PublicRoutes = {
  Home: `/`,
  Explore: `/explore`,
  Activity: `/activity`,
  Nfts: `/Nfts`,
  collections: `/Collections`,
  Artists: `/artists`,
  profileArtist: `/profile-artist/:ethAddress`,
  profileCollection: `/profile-colletion/:collectionAddress`,
  profileNft: `/profile-nft/:collect/:id`,
  HowItWorks: `/how-it-works`,
  PrivacyAndTerms: `/privacy-and-terms`,
  SignIn: `/sign-in`,
  SignUp: `/sign-up`,
  RecoverPassword: `/recover-password`,
  CertificateMovement: `/certificate-movement`,
};

export const PrivateRoutes = {
  User: `/user`,
  PaymentSuccess: `/payment/success/:id`,
  PaymentFailed: `/payment/failed/:id`,
  Payment: `/payments`,
  CreateNft: `/create-nft`,
};
