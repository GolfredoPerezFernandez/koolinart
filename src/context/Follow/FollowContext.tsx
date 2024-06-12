import { createContext } from "react";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { json } from "react-router-dom";

type FollowContextType = {
  ReviewToFollow: (followings: string) => Promise<boolean>;
  Follow: (followings: string) => void;
  NotFollow: (followings: string) => void;
  ShowFollowerOrFollowing: (decision: string, skip: number) => void;
  ShowFollowerOrFollowingArtist: (decision: string, skip: number) => void;
  ShowFollowerOrFollowingInfoPerfilArtist: (artist: string) => void;
  ShowFollowerOrFollowingInfoPerfilUser: () => void;
  FilterOptionsFollowerFunction: (userName: string) => void;
  FilterOptionsFollowingsFunction: (userNameFollowings: string) => void;
  ToGoFilterOptionsFollowerFunction: (
    ethAddressUser: any,
    userNameFollowers: string
  ) => void;
  FilterOptionsFollowerArtistFunction: (
    artist: string,
    userNameSearch: string
  ) => void;
  FilterOptionsFollowingsArtistFunction: (
    artist: string,
    userNameSearch: string
  ) => void;
  ToGoFilterOptionsFollowerArtistFunction: (
    ethAddressUser: string,
    userNameFollowers: string
  ) => void;
  TotalShowFollowerOrFollowing: (type: string) => void;
  TotalShowFollowerOrFollowingArtist: (type: string) => void;
} | null;

export const FollowContext = createContext<FollowContextType>(null);

const FollowState = (props: { children: any }) => {
  const {
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
    WatchFollow,
    ChangeWatchFollow,
    ActiveFollower,
    ChangeActiveFollower,
    ChangeFollowerOrFollowing,
    ChangeFollowerOrFollowingArtist,
    ChangeProfileUserFollowerOrFollowing,
    ChangeFilterOptionsFollower,
    ChangeFilterOptionsFollowings,
    ChangeFilterOptionsFollowingsArtist,
    UserRender,
    ChangeTotalFollowerOrFollowing,
    FollowerOrFollowing,
    ArtistEthAddress,
    ProfileArtistFollowerOrFollowing,
    ChangeProfileArtistFollowerOrFollowing,
    ChangeTotalProfileFollowerOrFollowingArtist,
  } = useBoundStore((state: any) => state, shallow);

  const ReviewToFollow = async (followings: string): Promise<boolean> => {
    try {
      if (followings) {
        let reviewToFollowFunc = await Moralis.Cloud.run("reviewToFollow", {
          followings,
        });
        return reviewToFollowFunc as boolean;
      }
      return false;
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const Follow = async (followings: string) => {
    try {
      await Moralis.Cloud.run("follow", {
        followings,
      });
      ChangeWatchFollow(!WatchFollow);
      ChangeActiveFollower(!ActiveFollower);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const NotFollow = async (followings: string) => {
    try {
      await Moralis.Cloud.run("unFollow", {
        followings,
      });
      ChangeWatchFollow(!WatchFollow);
      ChangeActiveFollower(!ActiveFollower);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const ShowFollowerOrFollowing = async (decision: string, skip: number) => {
    try {
      if (UserRender.length != 0) {
        switch (decision) {
          case "follower":
            let followerFunc = await Moralis.Cloud.run("showFollower", {
              skip,
            });
            const concatenatedArray = FollowerOrFollowing.concat(followerFunc);
            ChangeFollowerOrFollowing(
              skip === 0
                ? followerFunc
                  ? followerFunc
                  : []
                : concatenatedArray
            );
            break;
          case "following":
            let followingFunc = await Moralis.Cloud.run("showFollowing", {
              skip,
            });
            const concatenatedArraySecondary =
              FollowerOrFollowing.concat(followingFunc);
            ChangeFollowerOrFollowing(
              skip === 0
                ? followingFunc
                  ? followingFunc
                  : []
                : concatenatedArraySecondary
            );
            break;
        }
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject?.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const TotalShowFollowerOrFollowing = async (type: string) => {
    try {
      if (UserRender.length != 0) {
        console.log(`type ${type}`);
        switch (type) {
          case "follower":
            let followerFunc = await Moralis.Cloud.run("TotalshowFollower", {});
            ChangeTotalFollowerOrFollowing(followerFunc);
            break;
          case "following":
            let followingFunc = await Moralis.Cloud.run(
              "TotalshowFollowing",
              {}
            );
            ChangeTotalFollowerOrFollowing(followingFunc);
            break;
        }
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
  const ShowFollowerOrFollowingArtist = async (
    decision: string,
    skip: number
  ) => {
    try {
      console.log(`into decision ${decision}`);
      console.log(`into skip ${skip}`);
      switch (decision) {
        case "follower":
          let followerFunc = await Moralis.Cloud.run(
            "showFollowerProfileArtist",
            {
              skip,
              ethAddress: ArtistEthAddress,
            }
          );
          console.log(`Result follower ${JSON.stringify(followerFunc)}`);
          const concatenatedArray =
            ProfileArtistFollowerOrFollowing.concat(followerFunc);
          ChangeProfileArtistFollowerOrFollowing(
            skip === 0 ? followerFunc : concatenatedArray
          );
          break;
        case "following":
          let followingFunc = await Moralis.Cloud.run(
            "showFollowingProfileArtist",
            {
              skip,
              ethAddress: ArtistEthAddress,
            }
          );
          console.log(`Result followingr ${followingFunc}`);
          console.log(`Result followingr length ${followingFunc.length}`);
          const concatenatedArraySecondary =
            ProfileArtistFollowerOrFollowing.concat(followingFunc);
          console.log(`Result followingr ${concatenatedArraySecondary}`);
          console.log(
            `Result followingr length ${concatenatedArraySecondary.length}`
          );

          ChangeProfileArtistFollowerOrFollowing(
            skip === 0
              ? followingFunc
                ? followingFunc
                : []
              : concatenatedArraySecondary
          );
          break;
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
  const TotalShowFollowerOrFollowingArtist = async (type: string) => {
    try {
      console.log(`into ArtistEthAddress ${ArtistEthAddress}`);
      console.log(`into ArtistEthAddress ${type}`);

      switch (type) {
        case "follower":
          let followerFunc = await Moralis.Cloud.run(
            "TotalshowFollowerProfileArtist",
            {
              ethAddress: ArtistEthAddress,
            }
          );
          console.log(`Result follower ${JSON.stringify(followerFunc)}`);
          ChangeTotalProfileFollowerOrFollowingArtist(followerFunc);
          break;
        case "following":
          let followingFunc = await Moralis.Cloud.run(
            "TotalshowFollowingProfileArtist",
            {
              ethAddress: ArtistEthAddress,
            }
          );
          console.log(`Result follower ${JSON.stringify(followingFunc)}`);

          ChangeTotalProfileFollowerOrFollowingArtist(followingFunc);
          break;
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
  const ShowFollowerOrFollowingInfoPerfilArtist = async (artist: string) => {
    try {
      let resultFunc = await Moralis.Cloud.run("showProfileArtistInfo", {
        artist,
      });
      console.log(`resultFunc ${JSON.stringify(resultFunc)} `);

      ChangeFollowerOrFollowingArtist(resultFunc);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const ShowFollowerOrFollowingInfoPerfilUser = async () => {
    try {
      if (UserRender.length != 0) {
        let resultFunc = await Moralis.Cloud.run(
          "showFollowingProfileUser",
          {}
        );
        ChangeProfileUserFollowerOrFollowing(resultFunc);
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
  const FilterOptionsFollowerFunction = async (userName: string) => {
    try {
      const resultFilterOptionsFollower = await Moralis.Cloud.run(
        "filterOptionFollower",
        { userName }
      );
      ChangeFilterOptionsFollower(resultFilterOptionsFollower);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const FilterOptionsFollowingsFunction = async (
    userNameFollowings: string
  ) => {
    try {
      const resultFilterOptionsFollowings = await Moralis.Cloud.run(
        "filterOptionFollowings",
        { userNameFollowings }
      );
      ChangeFilterOptionsFollowings(resultFilterOptionsFollowings);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const ToGoFilterOptionsFollowerFunction = async (
    ethAddressUser: string,
    userNameFollowers: string
  ) => {
    try {
      const resultToGoFilterOptionsFollower = await Moralis.Cloud.run(
        "toGoFilterOptionFollower",
        { ethAddressUser, userNameFollowers }
      );
      ChangeFollowerOrFollowing(resultToGoFilterOptionsFollower);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const FilterOptionsFollowerArtistFunction = async (
    artist: string,
    userNameSearch: string
  ) => {
    try {
      const resultFilterOptionsFollower = await Moralis.Cloud.run(
        "filterOptionFollowerArtist",
        { artist, userNameSearch }
      );
      ChangeFilterOptionsFollowingsArtist(resultFilterOptionsFollower);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const FilterOptionsFollowingsArtistFunction = async (
    artist: string,
    userNameSearch: string
  ) => {
    try {
      const resultFilterOptionsFollowings = await Moralis.Cloud.run(
        "filterOptionFollowingsArtist",
        { artist, userNameSearch }
      );
      ChangeFilterOptionsFollowingsArtist(resultFilterOptionsFollowings);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(errorObject.message);
      ChangeStateAlert(true);
      throw errorObject;
    }
  };
  const ToGoFilterOptionsFollowerArtistFunction = async (
    ethAddressUser: string,
    userNameFollowers: string
  ) => {
    try {
      const resultToGoFilterOptionsFollower = await Moralis.Cloud.run(
        "toGoFilterOptionFollowerArtist",
        { ethAddressUser, userNameFollowers }
      );
      ChangeFollowerOrFollowingArtist(resultToGoFilterOptionsFollower);
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
    <FollowContext.Provider
      value={{
        ReviewToFollow,
        Follow,
        NotFollow,
        ShowFollowerOrFollowing,
        ShowFollowerOrFollowingArtist,
        ShowFollowerOrFollowingInfoPerfilArtist,
        ShowFollowerOrFollowingInfoPerfilUser,
        FilterOptionsFollowerFunction,
        FilterOptionsFollowingsFunction,
        ToGoFilterOptionsFollowerFunction,
        FilterOptionsFollowerArtistFunction,
        FilterOptionsFollowingsArtistFunction,
        ToGoFilterOptionsFollowerArtistFunction,
        TotalShowFollowerOrFollowing,
        TotalShowFollowerOrFollowingArtist,
      }}
    >
      {props.children}
    </FollowContext.Provider>
  );
};

export default FollowState;
