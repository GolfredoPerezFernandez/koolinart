import { createContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
interface ValueInput {
  id: string;
  label: number;
  optional: string;
}
interface ValueInputCollection {
  id: string;
  label: number;
}
interface ValueInputUser {
  id: string;
  label: number;
}

type NftsContextType = {
  GetProfileNft: (collect: string, id: string) => Promise<void>;
  GetPageExploreNft: (skip: number, reset: boolean | any) => Promise<void>;
  GetPageExploreCollections: (
    skip: number,
    reset: boolean | any
  ) => Promise<void>;
  GetTotalPageExploreNft: () => Promise<void>;
  GetTotalPageExploreColletions: () => Promise<void>;
  GetPageExploreUser: (skip: number, reset: boolean | any) => Promise<void>;
  GetTotalPageExploreUser: () => Promise<void>;
  GetPageActivity: (skip: number, filter: string) => Promise<void>;
  GetTotalPageActivity: (type: string) => Promise<void>;
  GetPageNfts: (skip: number) => Promise<void>;
  GetTotalPageNfts: () => Promise<void>;
  GetPageNftsVarious: (
    skip: number,
    PageNftVariousCategories: object
  ) => Promise<void>;
  GetTotalPageNftsVarious: (PageNftVariousCategories: object) => Promise<void>;
  GetFilterValuePageExploreNft: (value: ValueInput) => Promise<void>;
  GetFilterValuePageExploreCollections: (
    value: ValueInputCollection
  ) => Promise<void>;
  GetFilterValuePageExploreUser: (value: ValueInputUser) => Promise<void>;
} | null;

export const NftsContext = createContext<NftsContextType>(null);

const NftsState = (props: { children: any }) => {
  const {
    ChangeProfileNft,
    ChangeProfileNftActivity,
    ChangePageExploreNft,
    PageExploreNft,
    PageExploreCollections,
    ChangePageExploreCollections,
    ChangeTotalPageExploreCollections,
    ChangeTotalPageExploreNft,
    ChangePageActivity,
    ChangeTotalPageActivity,
    PageActivity,
    ChangePageExploreUsers,
    ChangeTotalPageExploreUsers,
    PageExploreUser,
    PageNfts,
    ChangePageNfts,
    ChangeTotalPageNfts,
  } = useBoundStore((state: any) => state, shallow);

  const GetProfileNft = async (collect: string, id: string) => {
    try {
      console.log("entroaqui ")
      let idConvertType;
      const regex = /^[0-9]*$/;
      //nuevoerror
      regex.test(id) ? (idConvertType = +id) : (idConvertType = id);
      let getProfileNft: any = await Moralis.Cloud.run("getProfileNft", {
        idConvertType,
        collect,
      });
      console.log("entroaqui 2")

      ChangeProfileNft(getProfileNft);
      let getProfileNftActivity: any = await Moralis.Cloud.run(
        "getProfileNftActivity",
        {
          id,
          collect,
        }
      );
      console.log("getProfileNftActivity "+JSON.stringify(getProfileNftActivity))
      ChangeProfileNftActivity(getProfileNftActivity);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetPageExploreNft = async (skip: number, reset: boolean | any) => {
    try {
      let result: any = await Moralis.Cloud.run("getPageExploreNft", { skip });
      const concatenatedArray = PageExploreNft.concat(result);
      ChangePageExploreNft(reset ? result : concatenatedArray);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetTotalPageExploreNft = async () => {
    try {
      let result: any = await Moralis.Cloud.run("getTotalPageExploreNft", {});
      ChangeTotalPageExploreNft(result);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetFilterValuePageExploreNft = async (value: ValueInput) => {
    try {
      if (value) {
        let result: any = await Moralis.Cloud.run(
          "getFilterValuePageExploreNft",
          {
            token: value.id,
            collectionAddressSearch: value.optional,
          }
        );
        ChangeTotalPageExploreNft(0);
        ChangePageExploreNft([result]);
      }
    } catch (error: any) {
      console.log(`error in cloud is ${error}`);
      throw error;
    }
  };
  const GetPageExploreCollections = async (
    skip: number,
    reset: boolean | any
  ) => {
    try {
      console.log(`skip is  ${skip}`);
      let result: any = await Moralis.Cloud.run("getPageExploreCollections", {
        skip,
      });
      console.log(`collections explore ${result}`);
      const concatenatedArray = PageExploreCollections.concat(result);
      ChangePageExploreCollections(reset ? result : concatenatedArray);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetTotalPageExploreColletions = async () => {
    try {
      let result: any = await Moralis.Cloud.run(
        "getTotalPageExploreCollections",
        {}
      );
      ChangeTotalPageExploreCollections(result);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetFilterValuePageExploreCollections = async (
    value: ValueInputCollection
  ) => {
    try {
      if (value) {
        console.log(`valu in get filter ${JSON.stringify(value)}`);
        console.log(`valu in get filter ${value.id}`);
        let result: any = await Moralis.Cloud.run(
          "getFilterValuePageExploreCollections",
          {
            collectionAddressSearch: value.id,
          }
        );
        console.log(`result in get filter ${result}`);

        ChangeTotalPageExploreCollections(0);
        ChangePageExploreCollections([result]);
      }
    } catch (error: any) {
      console.log(`error in cloud is ${error}`);
      throw error;
    }
  };
  const GetPageExploreUser = async (skip: number, reset: boolean | any) => {
    try {
      let result: any = await Moralis.Cloud.run("getPageExploreUser", {
        skip,
      });
      const concatenatedArray = PageExploreUser.concat(result);
      ChangePageExploreUsers(reset ? result : concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalPageExploreUser = async () => {
    try {
      let result: any = await Moralis.Cloud.run("getTotalPageExploreUser", {});
      ChangeTotalPageExploreUsers(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetFilterValuePageExploreUser = async (value: ValueInputUser) => {
    try {
      if (value) {
        let result: any = await Moralis.Cloud.run(
          "getFilterValuePageExploreUser",
          {
            ethAddressUser: value.id,
          }
        );
        ChangeTotalPageExploreUsers(0);
        ChangePageExploreUsers([result]);
      }
    } catch (error: any) {
      console.log(`error in cloud is ${error}`);
      throw error;
    }
  };
  const GetPageActivity = async (skip: number, filter: string) => {
    try {
      const getNftActivity = await Moralis.Cloud.run("getPageActivity", {
        skip,
        filter,
      });
      const concatenatedArray = PageActivity.concat(getNftActivity);
      ChangePageActivity(skip == 0 ? getNftActivity : concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetTotalPageActivity = async (type: string) => {
    try {
      const result = await Moralis.Cloud.run("getTotalPageActivity", { type });
      ChangeTotalPageActivity(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetPageNfts = async (skip: number) => {
    try {
      let result: any = await Moralis.Cloud.run("getPageNft", {
        skip,
      });
      const concatenatedArray = PageNfts.concat(result);
      ChangePageNfts(concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalPageNfts = async () => {
    try {
      let result: any = await Moralis.Cloud.run("getTotalPageNft", {});
      ChangeTotalPageNfts(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetPageNftsVarious = async (
    skip: number,
    PageNftVariousCategories: object
  ) => {
    try {
      let result = await Moralis.Cloud.run("getPageNftsFilterVarious", {
        skip,
        PageNftVariousCategories,
      });
      const concatenatedArray = PageNfts.concat(result);
      ChangePageNfts(skip === 0 ? result : concatenatedArray);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalPageNftsVarious = async (PageNftVariousCategories: object) => {
    try {
      const result: any = await Moralis.Cloud.run(
        "getTotalPageNftsFilterVarious",
        {
          PageNftVariousCategories,
        }
      );
      ChangeTotalPageNfts(result);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };

  return (
    <NftsContext.Provider
      value={{
        GetProfileNft,
        GetPageExploreNft,
        GetPageExploreCollections,
        GetTotalPageExploreColletions,
        GetPageExploreUser,
        GetTotalPageExploreUser,
        GetTotalPageExploreNft,
        GetPageActivity,
        GetTotalPageActivity,
        GetPageNfts,
        GetTotalPageNfts,

        GetPageNftsVarious,
        GetTotalPageNftsVarious,
        GetFilterValuePageExploreNft,
        GetFilterValuePageExploreCollections,
        GetFilterValuePageExploreUser,
      }}
    >
      {props.children}
    </NftsContext.Provider>
  );
};

export default NftsState;
