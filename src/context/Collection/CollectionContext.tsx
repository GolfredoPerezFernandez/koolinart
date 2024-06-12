import { Moralis } from "moralis-v1";
import { createContext } from "react";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

type CollectionContextType = {
  GetProfileCollection: (collectionAddress: string) => Promise<void>;
  GetProfileCollectionOnSale: (
    skip: number,
    collectionAddress: string
  ) => Promise<void>;
  GetTotalProfileCollectionOnSale: (collectionAddress: string) => Promise<void>;
  GetProfileCollectionOwned: (
    skip: number,
    collectionAddress: string
  ) => Promise<void>;
  GetTotalProfileCollectionOwned: (collectionAddress: string) => Promise<void>;
} | null;

export const CollectionContext = createContext<CollectionContextType>(null);

const CollectionState = (props: { children: any }) => {
  const {
    ChangeCollectionData,
    ChangeCollectionEthAddress,
    CollectionOnSale,
    CollectionOwned,
    ChangeCollectionOnSale,
    ChangeCollectionOwned,
    ChangeTotalCollectionOnSale,
    ChangeTotalCollectionOwned,
  } = useBoundStore((state: any) => state, shallow);

  const GetProfileCollection = async (collectionAddress: string) => {
    try {
      ChangeCollectionEthAddress(collectionAddress);
      let result = await Moralis.Cloud.run("getProfileCollection", {
        collectionAddress,
      });
      ChangeCollectionData(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileCollectionOnSale = async (
    skip: number,
    collectionAddress: string
  ) => {
    try {
      let result = await Moralis.Cloud.run("getProfileCollectionOnSale", {
        collectionAddress,
        skip,
      });
      const concatenatedArray = CollectionOnSale.concat(result);
      ChangeCollectionOnSale(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileCollectionOnSale = async (collectionAddress: string) => {
    try {
      let result = await Moralis.Cloud.run("getProfileCollectionOnSaleTotal", {
        collectionAddress,
      });
      ChangeTotalCollectionOnSale(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileCollectionOwned = async (
    skip: number,
    collectionAddress: string
  ) => {
    try {
      let result = await Moralis.Cloud.run("getProfileCollectionOwned", {
        collectionAddress,
        skip,
      });
      const concatenatedArray = CollectionOwned.concat(result);
      ChangeCollectionOwned(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileCollectionOwned = async (collectionAddress: string) => {
    try {
      let result = await Moralis.Cloud.run("getProfileCollectionOwnedTotal", {
        collectionAddress,
      });
      ChangeTotalCollectionOwned(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  return (
    <CollectionContext.Provider
      value={{
        GetProfileCollection,
        GetProfileCollectionOnSale,
        GetTotalProfileCollectionOnSale,
        GetProfileCollectionOwned,
        GetTotalProfileCollectionOwned,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionState;
