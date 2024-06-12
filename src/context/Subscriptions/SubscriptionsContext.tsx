import { createContext, useContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { HomeContext } from "@/context/Home/HomeContext";
import { CreateNftContext } from "@/context/CreateNft/CreateNftContext";

type SubscriptionsContextType = {
  SubscriptionsSelectCollections: (ethAddress: string) => Promise<void>;
  SubscriptionPerfilUserData: (ethAddress: string) => Promise<void>;
  SubscriptionNftPerfilNft: (objectId: any) => Promise<void>;
  SubscriptionNftCarouselLive: () => Promise<void>;
} | null;

export const SubscriptionsContext =
  createContext<SubscriptionsContextType>(null);

const SubscriptionsState = (props: { children: any }) => {
  const { setUserRender, UserRender } = useBoundStore(
    (state: any) => state,
    shallow
  );
  const { GetCollectionItemsCreateNft }: any = useContext(CreateNftContext);
  const { GetProfileNft }: any = useContext(NftsContext);
  const { GetCarouselLive }: any = useContext(HomeContext);

  const SubscriptionsSelectCollections = async (ethAddress: string) => {
    try {
      let query = new Moralis.Query("CollectionsPolygon");
      query.equalTo("owner", ethAddress);
      let subscription = await query.subscribe();
      subscription.on(
        "create",
        async (object: Moralis.Object<Moralis.Attributes>) => {
          const updatedUser = await object.fetch();
          await GetCollectionItemsCreateNft();
          SubscriptionsSelectCollections(UserRender.attributes.ethAddress);
        }
      );
      subscription.on(
        "update",
        async (object: Moralis.Object<Moralis.Attributes>) => {
          const updatedUser = await object.fetch();
          await GetCollectionItemsCreateNft();
          SubscriptionsSelectCollections(UserRender.attributes.ethAddress);
        }
      );
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const SubscriptionPerfilUserData = async (ethAddress: string) => {
    try {
      let query = new Moralis.Query("User");
      query.equalTo("ethAddress", ethAddress);
      let subscription = await query.subscribe();

      subscription.on(
        "create",
        async (object: Moralis.Object<Moralis.Attributes>) => {
          const updatedUser = await object.fetch();
          setUserRender(updatedUser);

          SubscriptionPerfilUserData(ethAddress);
        }
      );

      subscription.on(
        "update",
        async (object: Moralis.Object<Moralis.Attributes>) => {
          const updatedUser = await object.fetch();
          setUserRender(updatedUser);

          SubscriptionPerfilUserData(ethAddress);
        }
      );
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const SubscriptionNftPerfilNft = async (objectId: any) => {
    try {
      if (objectId) {
        let query = new Moralis.Query("ItemsMinted");
        query.equalTo("objectId", objectId);
        let subscription = await query.subscribe();

        subscription.on(
          "update",
          async (object: Moralis.Object<Moralis.Attributes>) => {
            const updatedNftPerfilNft = await object.fetch();
            const collectionAddress =
              updatedNftPerfilNft.get("collectionAddress");
            const tokenId = updatedNftPerfilNft.get("tokenId");

            await GetProfileNft(tokenId, collectionAddress);

            SubscriptionNftPerfilNft(objectId);
          }
        );
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const SubscriptionNftCarouselLive = async () => {
    const query = new Moralis.Query("ItemsMinted");
    let subscription = await query.subscribe();

    subscription.on("create", SubscriptionNftCarouselLive);
    subscription.on("update", GetCarouselLive);
  };
  return (
    <SubscriptionsContext.Provider
      value={{
        SubscriptionsSelectCollections,
        SubscriptionPerfilUserData,
        SubscriptionNftPerfilNft,
        SubscriptionNftCarouselLive,
      }}
    >
      {props.children}
    </SubscriptionsContext.Provider>
  );
};

export default SubscriptionsState;
