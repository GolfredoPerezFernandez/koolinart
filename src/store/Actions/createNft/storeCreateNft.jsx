import { contracts } from "@/config/moralis-connect";

export const storeCreateNft = (set) => ({
  CollectionCreateNft: undefined | File,
  CollectionFilePath: undefined | File,
  CollectionsItems: [],
  CollectionsItemsSelect: [],
  CollectionsState: contracts.collection,
  CreateNFtImageIdentification: undefined | File,
  PreviewNft: undefined | File,
  PreviewNftName: "",
  PreviewNftPrice: 0,
  PreviewNftBids: 0,
  ChangeCollectionCreateNft: (value) => set({ CollectionCreateNft: value }),
  ChangeCollectionFilePath: (value) => set({ CollectionFilePath: value }),
  ChangeCollectionsItems: (value) => set({ CollectionsItems: value }),
  ChangeCollectionsItemsSelect: (value) =>
    set({ CollectionsItemsSelect: value }),
  ChangeCollectionsState: (value) => set({ CollectionsState: value }),
  ChangeCreateNFtImageIdentification: (value) =>
    set({ CreateNFtImageIdentification: value }),
  ChangePreviewNft: (value) => set({ PreviewNft: value }),
  ChangePreviewNftName: (value) => set({ PreviewNftName: value }),
  ChangePreviewNftPrice: (value) => set({ PreviewNftPrice: value }),
  ChangePreviewNftBids: (value) => set({ PreviewNftBids: value }),
});
