import { Moralis } from "moralis-v1";
import { createContext } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { contracts, chainID } from "@/config/moralis-connect";

import useGetNativeBalance from "@/hooks/useGetNativeBalance";
import useGetWalletTokenBalances from "@/hooks/useGetWalletTokenBalances";
import useSetIpfsUploadFolder from "@/hooks/useSetIpfsUploadFolder";
import { generatePrivateKey } from "viem/accounts";

interface LoginValues {
  username: string;
  password: string;
}
interface CreateUserValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}
interface SettingsValues {
  userAvatar: File | undefined;
  userBanner: File | undefined;
  fullname: string;
  username: string;
  email: string;
  biography: string;
}

type UserContextType = {
  LoginMail: (values: LoginValues) => Promise<void>;
  LoginMetamask: () => Promise<void>;
  LogoutFunc: () => Promise<void>;
  CreateUser: (values: CreateUserValues) => Promise<void>;
  GetProfileUserNftOnSale: (skip: number) => Promise<void>;
  GetTotalProfileUserNftOnSale: () => Promise<void>;
  GetProfileUserNftOwned: (skip: number) => Promise<void>;
  GetTotalProfileUserNftOwned: () => Promise<void>;
  GetProfileUserCollections: (skip: number) => Promise<void>;
  GetTotalProfileUserCollections: () => Promise<void>;
  SetSettingsUser: (values: SettingsValues) => Promise<void>;
  RecoverPassword: (values: { email: string }) => Promise<void>;
  VerifiedPassword: (values: { email: string }) => Promise<void>;
} | null;

export const UserContext = createContext<UserContextType>(null);

const UserState = (props: { children: any }) => {
  const { logout, enableWeb3, authenticate, refetchUserData } = useMoralis();

  const {
    Authenticated,
    setAuthenticated,
    setLoginType,
    setUserRender,
    setAmountKnrtUser,
    setMaticBalance,
    setNftsPerfilUser,
    setNftPerfil,
    UserRender,
    ProfileUserNftOnSale,
    ChangeProfileUserNftOnSale,
    ChangeTotalProfileUserNftOnSale,
    ProfileUserNftOwned,
    ChangeProfileUserNftOwned,
    ChangeTotalProfileUserNftOwned,
    ProfileUserCollections,
    ChangeProfileUserCollections,
    ChangeTotalProfileUserCollections,
  } = useBoundStore((state: any) => state, shallow);

  const userEthAddress = UserRender.attributes?.ethAddress
    ? UserRender.attributes.ethAddress.toString().toLowerCase()
    : "";

  const clearDataUser = () => {
    setUserRender([]);
    setNftsPerfilUser([]);
    setAmountKnrtUser("");
    setMaticBalance("");
    setLoginType("");
    setNftPerfil({});
    setAuthenticated(false);
  };
  const fetchTokenBalance = async (ethAddress: string) => {
    const balances = await useGetWalletTokenBalances(ethAddress);
    const balanceMaticConvert = await useGetNativeBalance(ethAddress);

    balances.forEach((value: any) => {
      if (value.token_address.toLowerCase() === contracts.token.toLowerCase()) {
        const balanceConvert = Moralis.Units.FromWei(value.balance);
        setAmountKnrtUser(balanceConvert);
      }
    });
    var balance: any = Moralis.Units.FromWei(balanceMaticConvert.balance);
    setMaticBalance(balance);
  };
  const switchNetworkPolygon: any = async function () {
    await Moralis.switchNetwork(chainID.red);
  };
  const LoginMail = async (values: LoginValues) => {
    try {
      if (!Authenticated) {
        await Moralis.User.logIn(values.username, values.password)
          .then(async function (user: any) {
            const userMarketType = user.get("loginType");
            const ethAddres = user!.get("ethAddress");
            setAuthenticated(true);
            setLoginType(userMarketType);
            setUserRender(user);
            await fetchTokenBalance(ethAddres);
          })
          .catch(function (error: any) {
            const errorMessage = JSON.stringify(error);
            const errorObject = JSON.parse(errorMessage);
            throw errorObject.message;
          });
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const LoginMetamask = async () => {
    try {
      const provider = "metamask";
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;
      const { message } = await Moralis.Cloud.run("requestMessage", {
        address: account,
        chain: chainId,
        networkType: "evm",
      });
      if (!account) {
        throw new Error(
          "Connecting to chain failed, as no connected account was found"
        );
      }
      if (!chainId) {
        throw new Error(
          "Connecting to chain failed, as no connected chain was found"
        );
      }
      if (!Authenticated) {
        if (chainId != chainID.red) {
          await switchNetworkPolygon();
        }
        await authenticate({
          signingMessage: message,
        }).then(async (user: any) => {
          const ethAddres = user!.get("ethAddress");
          setAuthenticated(true);
          setLoginType("Metamask");
          setUserRender(user);
          await fetchTokenBalance(ethAddres);
        });
      }
    } catch (error: any) {
      error.message == "Cannot read properties of undefined (reading 'get')"
        ? (error.message = "an error occurred, please try again")
        : error.message;
      const errorMessage = JSON.stringify(error.message);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const LogoutFunc = async () => {
    try {
      if (Authenticated) {
        await logout();
        location.reload();
        clearDataUser();
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const CreateUser = async (values: CreateUserValues) => {
    try {
      const user = new Moralis.User();
      user.set("fullname", values.fullname);
      user.set("username", values.username);
      user.set("email", values.email);
      user.set("password", values.password);
 
const privateKey = generatePrivateKey()
      user.set("privateKey", privateKey);
      user.set("ethAddress", wallet.address.toLowerCase());
      user.set("accounts", [wallet.address.toLowerCase()]);
      user.set("loginType", "email");
      await user.signUp();
      const userId = user.id;

      // Create an ACL object
      const acl = new Moralis.ACL();

      // Set read access for the user to true
      acl.setReadAccess(userId, true);

      // Set write access for the user to false (read-only)
      acl.setWriteAccess(userId, true);

      // Set the ACL object for the user
      user.setACL(acl);

      // Set the ACL object only for the "privateKey" field
      acl.setReadAccess("privateKey", true);
      acl.setWriteAccess("privateKey", true);
      acl.setReadAccess("mnemonic", true);
      acl.setWriteAccess("mnemonic", true);
      console.log(`init 5`);

      // Save the user object to the server
      await user.save();
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileUserNftOnSale = async (skip: number) => {
    try {
      if (UserRender.length != 0) {
        console.log(`skip ${skip}`);
        let result: any = await Moralis.Cloud.run("getProfileUserNftOnSale", {
          skip,
          userEthAddress,
        });
        console.log(`result ${JSON.stringify(result)}`);
        const concatenatedArray = ProfileUserNftOnSale.concat(result);
        ChangeProfileUserNftOnSale(concatenatedArray);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileUserNftOnSale = async () => {
    try {
      if (UserRender.length != 0) {
        let result: any = await Moralis.Cloud.run(
          "getTotalProfileUserNftOnSale",
          {
            userEthAddress,
          }
        );
        console.log(`result Total ${JSON.stringify(result)}`);
        ChangeTotalProfileUserNftOnSale(result);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileUserNftOwned = async (skip: number) => {
    try {
      if (UserRender.length != 0) {
        let result: any = await Moralis.Cloud.run("getProfileUserNftOwned", {
          skip,
          userEthAddress,
        });
        const concatenatedArray = ProfileUserNftOwned.concat(result);
        ChangeProfileUserNftOwned(concatenatedArray);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileUserNftOwned = async () => {
    try {
      if (UserRender.length != 0) {
        let result: any = await Moralis.Cloud.run(
          "getTotalProfileUserNftOwned",
          {
            userEthAddress,
          }
        );
        ChangeTotalProfileUserNftOwned(result);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetProfileUserCollections = async (skip: number) => {
    try {
      if (UserRender.length != 0) {
        let result: any = await Moralis.Cloud.run("getProfileUserCollections", {
          skip,
          userEthAddress,
        });
        const concatenatedArray = ProfileUserCollections.concat(result);
        ChangeProfileUserCollections(concatenatedArray);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const GetTotalProfileUserCollections = async () => {
    try {
      if (UserRender.length != 0) {
        let result: any = await Moralis.Cloud.run(
          "getTotalProfileUserCollections",
          {
            userEthAddress,
          }
        );
        ChangeTotalProfileUserCollections(result);
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetSettingsUser = async (values: SettingsValues) => {
    try {
      if (UserRender.length != 0) {
        console.log(`values ${JSON.stringify(values)}`);
        refetchUserData();
        console.log(`into 1`);
        const user: any = Moralis.User.current();
        console.log(`into 2`);

        if (values.userAvatar) {
          const data = values.userAvatar;

          console.log(`into userAvatar ${data}`);
          console.log(`into userAvatar name ${data.name}`);
          const { path, hash } = await useSetIpfsUploadFolder(
            userEthAddress,
            data,
            data?.name ? data.name : ""
          );
          console.log(`into path userAvatar${path}`);
          console.log(`into hash userAvatar${hash}`);

          user.set("userAvatar", path);
          user.set("userAvatarHash", hash);
          console.log(`end `);
        }
        if (values.userBanner) {
          console.log(`into userAvatar`);

          const data = values.userBanner;

          const { path, hash } = await useSetIpfsUploadFolder(
            userEthAddress,
            data,
            data.name
          );
          console.log(`into path userBanner ${path}`);
          console.log(`into hash userBanner ${hash}`);
          user.set("userBanner", path);
          user.set("userBannerHash", hash);
        }
        values.fullname ? user.set("fullname", values.fullname) : null;
        values.username ? user.set("username", values.username) : null;
        values.email ? user.set("email", values.email) : null;
        values.biography ? user.set("biography", values.biography) : null;
        user.save(null, { useMasterKey: true });
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const RecoverPassword = async (values: { email: string }) => {
    try {
      let currentUser = values.email;
      console.log(`currentUser ${currentUser}`);
      let result = await Moralis.Cloud.run("requestPasswordReset", {
        currentUser,
      });
      console.log(`result ${JSON.stringify(result)}`);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const VerifiedPassword = async (values: { email: string }) => {
    try {
      await Moralis.Cloud.run("sendVerificationEmail", { email: values });
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  return (
    <UserContext.Provider
      value={{
        LoginMail,
        LoginMetamask,
        LogoutFunc,
        CreateUser,
        GetProfileUserNftOnSale,
        GetTotalProfileUserNftOnSale,
        GetProfileUserNftOwned,
        GetTotalProfileUserNftOwned,
        GetProfileUserCollections,
        GetTotalProfileUserCollections,
        SetSettingsUser,
        RecoverPassword,
        VerifiedPassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
