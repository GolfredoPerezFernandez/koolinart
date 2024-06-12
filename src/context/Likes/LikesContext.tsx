import { createContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

type LikesContextType = {
  WatchLikesFunction: (token: any, collectionAddress: any) => void;
  LikeFunc: (token: any, collectionAddress: any) => void;
  DoNotLikesFunc: (token: any, collectionAddress: any) => void;
  likeUserStateFunc: (token: any, collectionAddress: any) => Promise<boolean>;
} | null;

export const LikesContext = createContext<LikesContextType>(null);

const LikesState = (props: { children: any }) => {
  const { ChangeLikes, ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } =
    useBoundStore((state: any) => state, shallow);

  const WatchLikesFunction = async (token: any, collectionAddress: any) => {
    try {
      let resultWatchLikes = await Moralis.Cloud.run("reviewLikes", {
        token,
        collectionAddress,
      });

      ChangeLikes({ resultWatchLikes });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const LikeFunc = async (token: any, collectionAddress: any) => {
    try {
      await Moralis.Cloud.run("LikesAdd", {
        token,
        collectionAddress,
      });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const DoNotLikesFunc = async (token: any, collectionAddress: any) => {
    try {
      await Moralis.Cloud.run("DoNotLikes", {
        token,
        collectionAddress,
      });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const likeUserStateFunc = async (
    token: any,
    collectionAddress: any
  ): Promise<boolean> => {
    try {
      let reviewToFollowFunc = await Moralis.Cloud.run("likeUserState", {
        token,
        collectionAddress,
      });
      return reviewToFollowFunc as boolean;
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };

  return (
    <LikesContext.Provider
      value={{
        WatchLikesFunction,
        LikeFunc,
        DoNotLikesFunc,
        likeUserStateFunc,
      }}
    >
      {props.children}
    </LikesContext.Provider>
  );
};

export default LikesState;
