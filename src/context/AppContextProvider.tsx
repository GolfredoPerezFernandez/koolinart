import React from "react";

import HomeState from "@/context/Home/HomeContext";
import UserState from "@/context/User/UserContext";
import InputsSearchState from "@/context/InputsSearch/InputsSearchContext";
import NftsState from "@/context/Nfts/NftsContext";
import MintState from "@/context/Mint/MintContext";
import LikesState from "@/context/Likes/LikesContext";
import FollowState from "@/context/Follow/FollowContext";
import CreateNftState from "@/context/CreateNft/CreateNftContext";
import ArtistState from "@/context/Artist/ArtistContext";
import CollectionState from "@/context/Collection/CollectionContext";
import SubscriptionsState from "@/context/Subscriptions/SubscriptionsContext";

import { combineComponents } from "./combineComponents";

interface AppContextProviderProps {
  children: React.ReactNode;
}
const providers: any = [
  HomeState,
  UserState,
  InputsSearchState,
  NftsState,
  MintState,
  LikesState,
  FollowState,
  CreateNftState,
  ArtistState,
  CollectionState,
  SubscriptionsState,
];

export const AppContextProvider: React.FC<AppContextProviderProps> =
  combineComponents(...providers);
