import { createContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

interface ValueFilterProfileUserFollowers {
  id: string;
  label: number;
}

type InputsSearchContextType = {
  GetFilterCoincidenceHome: (inputValue: string) => Promise<void>;
  GetFilterCoincidencePageNftsCollections: (
    inputValue: string
  ) => Promise<void>;
  GetFilterCoincidenceProfileUserFollowers: (
    inputValue: string
  ) => Promise<void>;
  GetFilterValueProfileUserFollowers: (
    values: ValueFilterProfileUserFollowers
  ) => Promise<void>;
  GetFilterCoincidenceProfileUserFollowings: (
    inputValue: string
  ) => Promise<void>;
  GetFilterCoincidenceExploreNft: (inputValue: string) => Promise<void>;
  GetFilterCoincidenceExploreCollections: (inputValue: string) => Promise<void>;
  GetFilterCoincidenceExploreUsers: (inputValue: string) => Promise<void>;
} | null;

export const InputsSearchContext = createContext<InputsSearchContextType>(null);

const InputsSearchState = (props: { children: any }) => {
  const {
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
    ChangeFilterCoincidenceHome,
    ChangeFilterCoincidencePageNftCollection,
    ChangeFilterCoincidenceProfileUserFollowers,
    ChangeFilterCoincidenceProfileUserFollowings,
    ChangeFollowerOrFollowing,
    ChangeFilterCoincidenceExploreNft,
    ChangeFilterCoincidenceExploreCollections,
    ChangeFilterCoincidenceExploreUsers,
  } = useBoundStore((state: any) => state, shallow);

  const GetFilterCoincidenceHome = async (inputValue: string) => {
    try {
      if (inputValue) {
        let resultFilterCoincidenceHome = await Moralis.Cloud.run(
          "getFilterCoincidenceItemsHome",
          { inputValue }
        );
        ChangeFilterCoincidenceHome(resultFilterCoincidenceHome);
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const GetFilterCoincidencePageNftsCollections = async (
    inputValue: string
  ) => {
    try {
      let resultFilterCoincidenceHome = await Moralis.Cloud.run(
        "getFilterNftsCollection",
        { inputValue }
      );
      ChangeFilterCoincidencePageNftCollection(resultFilterCoincidenceHome);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const GetFilterCoincidenceProfileUserFollowers = async (
    inputValue: string
  ) => {
    try {
      let result = await Moralis.Cloud.run(
        "getFilterCoincidenceProfileUserFollowers",
        {
          inputValue,
        }
      );
      ChangeFilterCoincidenceProfileUserFollowers(result);
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
      throw error;
    }
  };
  const GetFilterValueProfileUserFollowers = async (
    values: ValueFilterProfileUserFollowers
  ) => {
    try {
      if (values) {
        let result = await Moralis.Cloud.run("getFilterProfileUserValue", {
          ethAddressUser: values.id,
        });
        ChangeFollowerOrFollowing([result]);
      }
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
    }
  };
  const GetFilterCoincidenceProfileUserFollowings = async (
    inputValue: string
  ) => {
    try {
      if (inputValue) {
        let result = await Moralis.Cloud.run(
          "getFilterCoincidenceProfileUserFollowings",
          {
            inputValue,
          }
        );
        ChangeFilterCoincidenceProfileUserFollowings(result);
      }
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
      throw error;
    }
  };
  const GetFilterCoincidenceExploreNft = async (inputValue: string) => {
    try {
      if (inputValue) {
        console.log(`input value is ${inputValue}`);
        let result = await Moralis.Cloud.run("getFilterCoincidenceExploreNft", {
          inputValue,
        });
        console.log(`result is ${JSON.stringify(result)}`);
        ChangeFilterCoincidenceExploreNft(result);
      }
    } catch (error: any) {
      console.log(`error in cloud is ${error}`);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
      throw error;
    }
  };
  const GetFilterCoincidenceExploreCollections = async (inputValue: string) => {
    try {
      if (inputValue) {
        let result = await Moralis.Cloud.run(
          "getFilterCoincidenceExploreCollecions",
          {
            inputValue,
          }
        );
        console.log(`value is ${inputValue}`);
        console.log(`result is ${result}`);
        console.log(`result is ${JSON.stringify(result)}`);
        ChangeFilterCoincidenceExploreCollections(result);
      }
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
      throw error;
    }
  };
  const GetFilterCoincidenceExploreUsers = async (inputValue: string) => {
    try {
      if (inputValue) {
        let result = await Moralis.Cloud.run(
          "getFilterCoincidenceExploreUsers",
          {
            inputValue,
          }
        );
        ChangeFilterCoincidenceExploreUsers(result);
      }
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
      throw error;
    }
  };
  return (
    <InputsSearchContext.Provider
      value={{
        GetFilterCoincidenceHome,
        GetFilterCoincidencePageNftsCollections,
        GetFilterCoincidenceProfileUserFollowers,
        GetFilterValueProfileUserFollowers,
        GetFilterCoincidenceProfileUserFollowings,
        GetFilterCoincidenceExploreNft,
        GetFilterCoincidenceExploreCollections,
        GetFilterCoincidenceExploreUsers,
      }}
    >
      {props.children}
    </InputsSearchContext.Provider>
  );
};

export default InputsSearchState;
