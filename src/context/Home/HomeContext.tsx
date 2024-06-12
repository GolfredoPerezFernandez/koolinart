import { createContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

type HomeContextType = {
  GetCarouselInit: () => Promise<void>;
  GetCarouselLive: () => Promise<void>;
  GetCarouselTopSellers: () => Promise<void>;
  GetCarouselCollection: () => Promise<void>;
  GetCarouselExplore: () => Promise<void>;
} | null;

export const HomeContext = createContext<HomeContextType>(null);

const HomeState = (props: { children: any }) => {
  const {
    ChangeCarouselInit,
    ChangeNftCarouselLive,
    ChangeCarouselTopSellers,
    ChangeNftCarouselExplore,
    ChangeCollectionCarousel,
  } = useBoundStore((state: any) => state, shallow);

  const GetCarouselInit = async () => {
    try {
      let resultCarouselInit: any = await Moralis.Cloud.run(
        "getCarouselInit",
        {}
      );
      ChangeCarouselInit(resultCarouselInit);
    } catch (error: any) {
      throw error.message;
    }
  };

  const GetCarouselLive = async () => {
    try {
      let resultCarouselLive: any = await Moralis.Cloud.run(
        "getCarouselLive",
        {}
      );
      ChangeNftCarouselLive(resultCarouselLive);
    } catch (error: any) {
      throw error.message;
    }
  };

  const GetCarouselTopSellers = async () => {
    try {
      let resultCarouselTopSellers = await Moralis.Cloud.run(
        "getCarouselTopSellers",
        {}
      );
      ChangeCarouselTopSellers(resultCarouselTopSellers);
    } catch (error: any) {
      throw error.message;
    }
  };

  const GetCarouselExplore = async () => {
    try {
      let resultCarouselExplore: any = await Moralis.Cloud.run(
        "getCarouselExplore"
      );
      ChangeNftCarouselExplore(resultCarouselExplore);
    } catch (error: any) {
      throw error.message;
    }
  };

  const GetCarouselCollection = async () => {
    try {
      console.log(`GetCarouselCollection hot init`);

      let resultCarouselCollection: any = await Moralis.Cloud.run(
        "getCarouselCollections"
      );
      console.log(`GetCarouselCollection hot  ${resultCarouselCollection}`);
      console.log(
        `GetCarouselCollection JSON hot ${JSON.stringify(
          resultCarouselCollection
        )}`
      );
      ChangeCollectionCarousel(resultCarouselCollection);
    } catch (error: any) {
      throw error.message;
    }
  };

  return (
    <HomeContext.Provider
      value={{
        GetCarouselInit,
        GetCarouselLive,
        GetCarouselTopSellers,
        GetCarouselExplore,
        GetCarouselCollection,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeState;
