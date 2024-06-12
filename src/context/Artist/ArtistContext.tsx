import { Moralis } from "moralis-v1";
import { createContext } from "react";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

type ArtistContextType = {
  GetProfileArtist: (ethAddress: string) => Promise<void>;
  GetProfileArtistCreated: (skip: number, ethAddress: string) => Promise<void>;
  GetTotalProfileArtistCreated: (ethAddress: string) => Promise<void>;
  GetProfileArtistOnSale: (skip: number) => Promise<void>;
  GetTotalProfileArtistOnSale: () => Promise<void>;
  GetProfileArtistCollection: (skip: number) => Promise<void>;
  GetTotalProfileArtistCollection: () => Promise<void>;
} | null;

export const ArtistContext = createContext<ArtistContextType>(null);

const ArtistState = (props: { children: any }) => {
  const {
    ChangeArtistData,
    ArtistEthAddress,
    ArtistOnSale,
    ArtistOwned,
    ChangeArtistEthAddress,
    ChangeArtistOnSale,
    ChangeArtistOwned,
    ChangeArtistTotalOnSale,
    ChangeArtistTotalOwned,
    ArtistCollection,
    ChangeArtistCollection,
    ChangeArtistTotalCollection,
  } = useBoundStore((state: any) => state, shallow);

  const GetProfileArtist = async (ethAddress: string) => {
    try {
      ChangeArtistEthAddress(ethAddress);
      let result = await Moralis.Cloud.run("getArtistProfile", {
        ethAddress,
      });
      ChangeArtistData(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileArtistCreated = async (skip: number, ethAddress: string) => {
    try {
      let result = await Moralis.Cloud.run("getArtistProfileCreated", {
        ethAddress,
        skip,
      });
      const concatenatedArray = ArtistOwned.concat(result);
      ChangeArtistOwned(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileArtistCreated = async (ethAddress: string) => {
    try {
      let result = await Moralis.Cloud.run("getTotalArtistProfileCreated", {
        ethAddress,
      });
      ChangeArtistTotalOwned(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileArtistOnSale = async (skip: number) => {
    try {
      let result = await Moralis.Cloud.run("getArtistProfileOnSale", {
        ethAddress: ArtistEthAddress,
        skip,
      });
      const concatenatedArray = ArtistOnSale.concat(result);
      ChangeArtistOnSale(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileArtistOnSale = async () => {
    try {
      let result = await Moralis.Cloud.run("getTotalArtistProfileOnSale", {
        ethAddress: ArtistEthAddress,
      });
      ChangeArtistTotalOnSale(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileArtistCollection = async (skip: number) => {
    try {
      let result = await Moralis.Cloud.run("getArtistProfileCollections", {
        ethAddress: ArtistEthAddress,
        skip,
      });
      const concatenatedArray = ArtistCollection.concat(result);
      ChangeArtistCollection(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileArtistCollection = async () => {
    try {
      let result = await Moralis.Cloud.run("getTotalArtistProfileCollections", {
        ethAddress: ArtistEthAddress,
      });
      ChangeArtistTotalCollection(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        GetProfileArtist,
        GetProfileArtistCreated,
        GetTotalProfileArtistCreated,
        GetProfileArtistOnSale,
        GetTotalProfileArtistOnSale,
        GetProfileArtistCollection,
        GetTotalProfileArtistCollection,
      }}
    >
      {props.children}
    </ArtistContext.Provider>
  );
};

export default ArtistState;
