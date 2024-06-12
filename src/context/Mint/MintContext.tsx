import { Moralis } from "moralis-v1";
import { createContext } from "react";
  import { useBoundStore } from "@/store/index";
  import { shallow } from "zustand/shallow";
  import { auctionsAbi, tokenErc721Abi, tokenERC20Abi } from "@/config/abi";
  import { apiAlchemy, contracts, urlProvider, creator } from "@/config/moralis-connect";
  import useSetIpfsUploadFolder from "@/hooks/useSetIpfsUploadFolder";
  import setTraitsMetaDataRandom from "@/hooks/setTraitsMetaDataRandom";
  import { createPublicClient, createWalletClient, http, parseEther, formatEther, custom, publicActions } from 'viem';
  import { privateKeyToAccount } from 'viem/accounts';
  import { base } from 'viem/chains';
  import { Buffer } from 'buffer';
  import { encodeFunctionData } from 'viem'

interface CreateNfts {
  identificationImgNft: undefined | File;
  NftData: undefined | File;
  typeFile: string;
  marketType: string;
  nameNftField: string;
  descriptionNft: string;
  minimumBid: number;
  price: number;
}
interface PlaceForSaleBids {
  marketType: string;
  minimumBid: number;
  price: number;
}
type MintContextType = {
  HandleBidMail: (
    price: string | number,
    tokenId: string,
    tokenAddress: string | number
  ) => Promise<void>;
  HandleBid: (
    price: string | number,
    tokenId: string,
    tokenAddress: string | number
  ) => Promise<void>;
  OnBuyRule: (
    buyNowPrice: string | number,
    tokenId: any,
    collectionAddress: string | number
  ) => Promise<[string, string] | void>;
  HandleRemoveRule: (
    collectionAddress: string | number,
    tokenId: string
  ) => Promise<void>;
  HandleHighestRule: (
    tokenId: string,
    collectionAddress: string | number
  ) => Promise<void>;
  HandleBurnRule: (
    tokenId: string,
    collectionAddress: string | number
  ) => Promise<void>;
  SetActivityNft: (
    updatedAtHistory: any,
    contractType: any,
    to_address: any,
    from_address: any,
    tokenId: any,
    nftId: any,
    nftId2: any,
    ownerAddress: any,
    imageFileHash: any,
    imageFileHashIdentification: any,
    metadataNft: any,
    forSale: any,
    minimumBid: any,
    buyNowPrice: any,
    collectionAddress: any,
    createdAtHistory: any,
    marketType: any,
    stateOfHistory: any
  ) => Promise<void>;
  GetCertificates: (skip: number) => Promise<void>;
  GetTotalCertificates: (values: CreateNfts) => Promise<void>;
  MintNft: (values: CreateNfts) => Promise<[string, string] | void>;
  MintNftPlaceForSaleBids: (values: PlaceForSaleBids) => Promise<void>;
} | null;

export const MintContext = createContext<MintContextType>(null);

  const configureWalletClient = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return createWalletClient({
        account: accounts[0],
        chain: base,
        transport: custom(window.ethereum),
      });
    } else {
      throw new Error("MetaMask no está disponible");
    }
  };
  const walletClient = await configureWalletClient();

  const publicClient = createPublicClient({
    chain: base,
    transport: http(`https://base-mainnet.infura.io/v3/7999682693a74489b8e6ab7070db18c0`)
  });
   
const MintState = (props: { children: any }) => {
  const {
    UserRender,
    LoginType,
    ProfileNft,
    MovementCertificateArray,
    ChangeMovementCertificateArray,
    ChangeTotalMovementCertificateArray,
    TypeStepperNoSale,
    TypeStepperSale,
    ChangeTypeStepper,
    ChangeOpenStepper,
    ChangeIndexProcess,
    ChangeErrorProcess,
    CollectionsState,
  } = useBoundStore((state: any) => state, shallow);
  const ethers = Moralis.web3Library;
  const privateKey = UserRender.attributes?.privateKey
    ? UserRender.attributes.privateKey
    : "";
  const metadataNft = ProfileNft?.metadataNft ? ProfileNft?.metadataNft : "";
  const marketType = ProfileNft?.marketType ? ProfileNft.marketType : "";
  const updatedAtHistory = ProfileNft?.updatedAt ? ProfileNft.updatedAt : "";
  const createdAtHistory = ProfileNft?.createdAt ? ProfileNft?.createdAt : "";
  const NftFileMetadataPath = ProfileNft?.NftFileMetadataPath
    ? ProfileNft?.NftFileMetadataPath
    : "";
  const imageFilePathIdentification = ProfileNft?.imageFilePathIdentification
    ? ProfileNft.imageFilePathIdentification
    : "";
  const imageFileHashIdentification = ProfileNft?.imageFileHashIdentification
    ? ProfileNft.imageFileHashIdentification
    : "";
  const imageFileHash = ProfileNft?.imageFileHash
    ? ProfileNft.imageFileHash
    : "";
  let collectionAddress = CollectionsState
    ? CollectionsState.toLowerCase()
    : "";
  const contractType = ProfileNft?.contractType ? ProfileNft.contractType : "";
  const to_address = ProfileNft?.ownerAddress ? ProfileNft?.ownerAddress : "";
  const from_address = UserRender?.attributes?.ethAddress
    ? ProfileNft?.attributes?.ethAddress
    : "";
  const ethAddress = UserRender.attributes?.ethAddress
    ? UserRender.attributes.ethAddress.toString().toLowerCase()
    : "";
  const minimumBid = ProfileNft?.minimumBid
    ? ProfileNft?.minimumBid.toString()
    : "0";
  const tokenId = ProfileNft?.tokenId
    ? ProfileNft.tokenId
    : ProfileNft?.tokenIdAdmin
    ? ProfileNft.tokenIdAdmin
    : "";
  const forSale = ProfileNft?.forSale ? ProfileNft?.forSale : false;
  const buyNowPrice = ProfileNft?.buyNowPrice ? ProfileNft?.buyNowPrice : "0";
  const currentBid = ProfileNft?.highestBid
    ? ProfileNft.highestBid
    : ProfileNft?.minimumBid
    ? ProfileNft.minimumBid
    : "0";
  const newDate = new Date();

  const HandleBidMail = async (
    price: string | number,
    tokenId: string,
    tokenAddress: string | number
  ) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        `${urlProvider}${apiAlchemy}`
      );
      const signer = new ethers.Wallet(privateKey, provider);
      const contract1 = new ethers.Contract(
        contracts.token,
        tokenERC20Abi,
        provider
      );
      const tx = await contract1
        .connect(signer)
        .approve(contracts.auction, Moralis.Units.ETH(price));

      const contract = new ethers.Contract(
        contracts.auction,
        auctionsAbi,
        provider
      );
      const addItemToMarket = await contract
        .connect(signer)
        .makeBid(
          tokenAddress,
          parseInt(tokenId),
          contracts.token,
          Moralis.Units.ETH(price)
        );
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const HandleBid = async (
    price: string | number,
    tokenId: string,
    tokenAddress: string | number
  ) => {
    try {
      const sendOptions2 = {
        contractAddress: contracts.token,
        functionName: "approve",
        abi: tokenERC20Abi,
        awaitReceipt: true,
        params: {
          spender: contracts.auction,
          amount: Moralis.Units.ETH(price), //Moralis.Units.ETH(price),
        },
      };
      let res: any = await Moralis.executeFunction(sendOptions2);

      await res.wait(2);

      const sendOptions = {
        contractAddress: contracts.auction,
        functionName: "makeBid",
        abi: auctionsAbi,
        awaitReceipt: true,
        params: {
          _nftContractAddress: tokenAddress,
          _tokenId: parseInt(tokenId),
          _erc20Token: contracts.token,
          _tokenAmount: Moralis.Units.ETH(price),
        },
      };

      const addItemToMarket: any = await Moralis.executeFunction(sendOptions);
      await addItemToMarket.wait(2);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetActivityNft = async (
    updatedAtHistory: any,
    contractType: any,
    to_address: any,
    from_address: any,
    tokenId: any,
    nftId: any,
    nftId2: any,
    ownerAddress: any,
    imageFileHash: any,
    imageFileHashIdentification: any,
    metadataNft: any,
    forSale: any,
    minimumBid: any,
    buyNowPrice: any,
    collectionAddress: any,
    createdAtHistory: any,
    marketType: any,
    stateOfHistory: any
  ) => {
    try {
      var lastTokenId;
      var dateUpdate;
      var dateCreateAt;

      if (tokenId?.toString() !== "" && tokenId?.toString() != undefined) {
        lastTokenId = tokenId;
      } else if (nftId !== "" && nftId != undefined) {
        lastTokenId = nftId?.toString();
      } else if (nftId2 !== "" && nftId2 != undefined) {
        lastTokenId = nftId2?.toString();
      }

      if (typeof updatedAtHistory === "string") {
        dateUpdate = new Date(updatedAtHistory); //.toLocaleDateString("en-US");
        dateCreateAt = new Date(createdAtHistory); //.toLocaleDateString("en-US");
      } else {
        dateUpdate = updatedAtHistory;
        dateCreateAt = createdAtHistory;
      }
      await Moralis.Cloud.run("setNftActivity", {
        contractType,
        to_address,
        from_address,
        ownerAddress,
        imageFileHash,
        imageFileHashIdentification,
        metadataNft,
        forSale,
        minimumBid,
        buyNowPrice,
        collectionAddress,
        marketType,
        stateOfHistory,
        dateUpdate,
        lastTokenId,
        dateCreateAt,
      });
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  async function MintNFT(metadataUrl: string, tokenAddress: string | number) {
    const royal = 20 * 2000;
    console.log("tokenAddress "+tokenAddress)
    console.log("metadataUrl "+metadataUrl)

    const mintRequest = {
      to: tokenAddress.toString().toLowerCase(),
      abi: tokenErc721Abi,
      functionName: "safeMint",
      args: [
     window.ethereum.selectedAddress,
              metadataUrl,
         
      ]
    };
  
    try {
      console.log(`mintRequest: ${mintRequest}`);
  
      // Simula la transacción para obtener la solicitud y el gas estimado
      const { request } = await publicClient.simulateContract({
   
        address: tokenAddress.toString().toLowerCase(),
        abi: tokenErc721Abi,
        functionName: 'safeMint',
        args: [
        window.ethereum.selectedAddress,
           metadataUrl,
          ], 
          account:window.ethereum.selectedAddress,
      });
      
      console.log(`request: ${request}`);

      // Envía la transacción
      const hash = await walletClient.writeContract(request);
  
      // Espera la confirmación de la transacción
      
const receipt = await publicClient.waitForTransactionReceipt( 
  { hash:hash }
)
      const tokenIdMinted = receipt.logs[0].topics[3]; // Aquí se obtiene el tokenId de los logs
      return parseInt(tokenIdMinted, 16).toString();
    } catch (error: any) {
      console.error("Error en MintNFT:", error);
      throw error;
    }
  }
  const OnBuyMailAdminEmailFunc = async (buyNowPrice: any) => {
    try {
      if (!UserRender) {
        return;
      }

      const provider = new ethers.providers.JsonRpcProvider(
        `${urlProvider}${apiAlchemy}`
      );
      const signer = new ethers.Wallet(privateKey, provider);

      const tokenContract = new ethers.Contract(
        contracts.token,
        tokenERC20Abi,
        signer
      );

      const tokenAmount = ethers.utils.parseUnits(buyNowPrice.toString(), 18); // 18 es la cantidad de decimales del token ERC20
      const toAddress = ethers.utils.getAddress(creator.owner);
      const tx = await tokenContract.transfer(toAddress, tokenAmount);

      // Esperar a que la   se confirme
      const fx = await tx.wait();

      let nftId: any;

      nftId = await MintNFTEmail(NftFileMetadataPath, collectionAddress);
      const ActivityUpdate = await Moralis.Cloud.run(
        "updateActivityNftAdminBuy",
        { tokenId, collectionAddress, nftId }
      );
      const query = new Moralis.Query("ItemsMinted");
      query.equalTo("collectionAddress", collectionAddress);
      query.equalTo("tokenIdAdmin", tokenId);
      const object = await query.first({ useMasterKey: true });

      object?.set("forSale", false);
      object?.set("adminMint", false);
      object?.set("tokenIdAdmin", "");
      object?.set("tokenId", parseInt(nftId));
      object?.set("ownerAddress", ethAddress);
      object?.set("buyNowPrice", 0);
      object?.set("minimumBid", 0);
      await object?.save(null, { useMasterKey: true });
      return [nftId, collectionAddress];
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetCountTopSellerNft = async (tokenId: any, collectionAddress: any) => {
    try {
      let totalCount: any = await Moralis.Cloud.run("getCountTopSeller", {
        tokenId,
        collectionAddress,
      });
      return totalCount;
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetTopSeller = async (tokenId: any, collectionAddress: any) => {
    let countSellerResponse = await SetCountTopSellerNft(
      tokenId,
      collectionAddress
    );

    try {
      if (countSellerResponse != 0 || null || undefined) {
        const query = new Moralis.Query("ItemsMinted");
        query.equalTo("collectionAddress", collectionAddress);
        query.equalTo("tokenId", parseInt(tokenId));
        const object = await query.first();
        object?.set("countSell", countSellerResponse++);
        await object?.save();
      } else {
        const query = new Moralis.Query("ItemsMinted");
        query.equalTo("collectionAddress", collectionAddress);
        query.equalTo("tokenId", parseInt(tokenId));
        const object = await query.first();
        object?.set("countSell", 1);
        await object?.save();
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetTotalCountSell = async () => {
    try {
      let totalCountSell: any = await Moralis.Cloud.run("setTotalCountSell", {
        to_address,
      });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetTotalSoldInToken = async (price: any) => {
    try {
      let setTotalCount: any = await Moralis.Cloud.run("setTotalSoldInToken", {
        to_address,
        price,
      });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const SetCountAndCountSold = async (
    tokenId: any,
    collectionAddress: any,
    buyNowPrice: any
  ) => {
    try {
      await SetTotalCountSell();
      await SetTotalSoldInToken(buyNowPrice);
      await SetTopSeller(tokenId, collectionAddress);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const OnBuyRule = async (
    buyNowPrice: string | number,
    tokenId: any,
    collectionAddress: string | number
  ): Promise<[string, string] | void> => {
    try {
      if (UserRender) {
        const regex = /^[0-9]*$/;
        if (LoginType == "email") {
          if (regex.test(tokenId)) {
            const provider = new ethers.providers.JsonRpcProvider(
              `${urlProvider}${apiAlchemy}`
            );
            const signer = new ethers.Wallet(privateKey, provider);
            const contract1 = new ethers.Contract(
              contracts.token,
              tokenERC20Abi,
              provider
            );
            const tx = await contract1
              .connect(signer)
              .approve(contracts.auction, Moralis.Units.ETH(buyNowPrice));

            const contract = new ethers.Contract(
              contracts.auction,
              auctionsAbi,
              provider
            );
            const addItemToMarket = await contract
              .connect(signer)
              .makeBid(
                collectionAddress,
                parseInt(tokenId),
                contracts.token,
                Moralis.Units.ETH(buyNowPrice)
              );

            await SetActivityNft(
              updatedAtHistory,
              contractType,
              from_address,
              to_address,
              tokenId.toString(),
              "",
              "",
              to_address,
              imageFileHash,
              imageFilePathIdentification,
              metadataNft,
              false,
              minimumBid,
              buyNowPrice.toString(),
              collectionAddress,
              createdAtHistory,
              marketType,
              "purchased"
            );
            await SetCountAndCountSold(tokenId, collectionAddress, buyNowPrice);
          } else {
            const result = await OnBuyMailAdminEmailFunc(buyNowPrice);
            const newTokenId = result?.[0];
            await SetActivityNft(
              updatedAtHistory,
              contractType,
              from_address,
              to_address,
              newTokenId.toString(),
              "",
              "",
              to_address,
              imageFileHash,
              imageFilePathIdentification,
              metadataNft,
              false,
              minimumBid,
              buyNowPrice.toString(),
              collectionAddress,
              createdAtHistory,
              marketType,
              "purchased"
            );
            await SetCountAndCountSold(
              newTokenId,
              collectionAddress,
              buyNowPrice
            );
          }
        } else {
          if (regex.test(tokenId)) {
            try {
              console.log(`init buy `);
              console.log(`buyNowPrice ${buyNowPrice} `);
              console.log(`tokenId ${tokenId} `);
              console.log(`collectionAddress ${collectionAddress} `);

              const sendOptions2 = {
                contractAddress: contracts.token,
                functionName: "approve",
                abi: tokenERC20Abi,
                awaitReceipt: true, // should be switched to false
                params: {
                  spender: contracts.auction,
                  amount: Moralis.Units.ETH(buyNowPrice), //Moralis.Units.ETH(buyNowPrice),
                },
              };
              console.log(`init buy 01`);

              let res: any = await Moralis.executeFunction(sendOptions2);
              console.log(`init buy 02`);

              await res.wait(2);
              console.log(`init buy 03`);

              const sendOptions = {
                contractAddress: contracts.auction,
                functionName: "makeBid",
                abi: auctionsAbi,
                awaitReceipt: true,
                params: {
                  _nftContractAddress: collectionAddress,
                  _tokenId: parseInt(tokenId),
                  _erc20Token: contracts.token,
                  _tokenAmount: Moralis.Units.ETH(buyNowPrice),
                },
              };
              console.log(`init buy 04`);

              const addItemToMarket: any = await Moralis.executeFunction(
                sendOptions
              );
              console.log(`init buy 05`);

              await addItemToMarket.wait(2);
              console.log(`init buy 06`);

              await SetActivityNft(
                updatedAtHistory,
                contractType,
                from_address,
                to_address,
                tokenId.toString(),
                "",
                "",
                from_address,
                imageFileHash,
                imageFilePathIdentification,
                metadataNft,
                false,
                minimumBid,
                buyNowPrice.toString(),
                collectionAddress,
                createdAtHistory,
                marketType,
                "purchased"
              );
              await SetCountAndCountSold(
                tokenId,
                collectionAddress,
                buyNowPrice
              );
            } catch (error) {
              console.log(`init buy error ${error}`);
              console.log(`init buy error json ${JSON.stringify(error)}`);
              const errorMessage = JSON.stringify(error);
              const errorObjeto = JSON.parse(errorMessage);
              throw errorObjeto; // throw the error again
            }
          } else {
            try {
              let nftId: any;
              let result = Moralis.transfer({
                type: "erc20",
                amount: Moralis.Units.Token(buyNowPrice.toString(), 18),
                receiver: creator.owner,
                contractAddress: contracts.token,
              });
              nftId = await MintNFT(NftFileMetadataPath, collectionAddress);
              console.log(`OnBuyRule`);
              const ActivityUpdate = await Moralis.Cloud.run(
                "updateActivityNftAdminBuy",
                {
                  tokenId,
                  collectionAddress: collectionAddress,
                  nftId,
                }
              );

              const query = new Moralis.Query("ItemsMinted");
              query.equalTo("collectionAddress", collectionAddress);
              query.equalTo("tokenIdAdmin", tokenId);
              const object = await query.first({ useMasterKey: true });

              object?.set("forSale", false);
              object?.set("adminMint", false);
              object?.set("tokenIdAdmin", "");
              object?.set("tokenId", parseInt(nftId));
              object?.set("ownerAddress", ethAddress);
              object?.set("buyNowPrice", 0);
              object?.set("minimumBid", 0);
              await object?.save(null, { useMasterKey: true });
              let resultAdmin = [nftId, collectionAddress];
              const newTokenId = resultAdmin[nftId];
              await SetActivityNft(
                updatedAtHistory,
                contractType,
                from_address,
                to_address,
                newTokenId.toString(),
                "",
                "",
                from_address,
                imageFileHash,
                imageFilePathIdentification,
                metadataNft,
                false,
                minimumBid,
                buyNowPrice.toString(),
                collectionAddress,
                createdAtHistory,
                marketType,
                "purchased"
              );
              await SetCountAndCountSold(
                newTokenId,
                collectionAddress,
                buyNowPrice
              );
            } catch (error) {
              const errorMessage = JSON.stringify(error);
              const errorObjeto = JSON.parse(errorMessage);
              throw errorObjeto;
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const HandleRemoveRule = async (
    collectionAddress: string | number,
    tokenId: string
  ) => {
    try {
      if (LoginType == "email") {
        const provider = new ethers.providers.JsonRpcProvider(
          `${urlProvider}${apiAlchemy}`
        );
        const signer = new ethers.Wallet(privateKey, provider);

        const contract1 = new ethers.Contract(
          contracts.auction,
          auctionsAbi,
          provider
        );
        const tx = await contract1
          .connect(signer)
          .withdrawAuction(collectionAddress, tokenId);

        await SetActivityNft(
          updatedAtHistory,
          contractType,
          to_address,
          from_address,
          tokenId.toString(),
          "",
          "",
          to_address,
          imageFileHash,
          imageFilePathIdentification,
          metadataNft,
          forSale,
          minimumBid,
          buyNowPrice.toString(),
          collectionAddress,
          createdAtHistory,
          marketType,
          "removed"
        );
      } else {
        const sendOptions = {
          contractAddress: contracts.auction,
          functionName: "withdrawAuction",
          abi: auctionsAbi,
          params: {
            _nftContractAddress: collectionAddress,
            _tokenId: tokenId,
          },
        };
        const addItemToMarket: any = await Moralis.executeFunction(sendOptions);

        await addItemToMarket.wait(1);
        await SetActivityNft(
          updatedAtHistory,
          contractType,
          to_address,
          from_address,
          tokenId.toString(),
          "",
          "",
          to_address,
          imageFileHash,
          imageFilePathIdentification,
          metadataNft,
          forSale,
          minimumBid,
          buyNowPrice.toString(),
          collectionAddress,
          createdAtHistory,
          marketType,
          "removed"
        );
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const HandleHighestRule = async (
    tokenId: string,
    collectionAddress: string | number
  ) => {
    try {
      if (LoginType == "email") {
        const provider = new ethers.providers.JsonRpcProvider(
          `${urlProvider}${apiAlchemy}`
        );
        const signer = new ethers.Wallet(privateKey, provider);
        const contract1 = new ethers.Contract(
          contracts.auction,
          auctionsAbi,
          provider
        );
        const tx = await contract1
          .connect(signer)
          .takeHighestBid(collectionAddress, tokenId);
        const cloudToAddress = await Moralis.Cloud.run(
          "handleHighestRuleToAddress",
          { tokenId, collectionAddress }
        );
        await SetActivityNft(
          updatedAtHistory,
          contractType,
          cloudToAddress,
          from_address,
          tokenId.toString(),
          "",
          "",
          from_address,
          imageFileHash,
          imageFilePathIdentification,
          metadataNft,
          forSale,
          currentBid.toString(),
          buyNowPrice.toString(),
          collectionAddress,
          createdAtHistory,
          marketType,
          "createHighestBid"
        );
        await SetCountAndCountSold(tokenId, collectionAddress, currentBid);
      } else {
        const user = await Moralis.User.current();
        if (user) {
          const sendOptions4 = {
            contractAddress: contracts.auction,
            functionName: "takeHighestBid",
            abi: auctionsAbi,
            awaitReceipt: true,
            params: {
              _tokenId: tokenId,
              _nftContractAddress: collectionAddress,
            },
          };
          const tx2: any = await Moralis.executeFunction(sendOptions4);
          let res = await tx2.wait(1);
          const cloudToAddress = await Moralis.Cloud.run(
            "handleHighestRuleToAddress",
            { tokenId, collectionAddress }
          );
          await SetActivityNft(
            updatedAtHistory,
            contractType,
            cloudToAddress,
            from_address,
            tokenId.toString(),
            "",
            "",
            from_address,
            imageFileHash,
            imageFilePathIdentification,
            metadataNft,
            forSale,
            currentBid.toString(),
            buyNowPrice.toString(),
            collectionAddress,
            new Date(createdAtHistory),
            marketType,
            "createHighestBid"
          );
          await SetCountAndCountSold(tokenId, collectionAddress, currentBid);
        } else {
          throw "Unregistered user;";
        }
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const HandleBurnRule = async (collectionAddress: string, tokenId: any) => {
    try {
      if (LoginType == "email") {
        const provider = new ethers.providers.JsonRpcProvider(
          `${urlProvider}${apiAlchemy}`
        );
        const signer = new ethers.Wallet(privateKey, provider);
        const contract1 = new ethers.Contract(
          collectionAddress,
          tokenErc721Abi,
          provider
        );
        const tx = await contract1.connect(signer).burn(tokenId);
        await SetActivityNft(
          updatedAtHistory,
          contractType,
          to_address,
          from_address,
          tokenId.toString(),
          "",
          "",
          to_address,
          imageFileHash,
          imageFilePathIdentification,
          metadataNft,
          forSale,
          minimumBid,
          buyNowPrice.toString(),
          collectionAddress,
          createdAtHistory,
          marketType,
          "burn"
        );
      } else {
        let sendOptions4 = {
          contractAddress: collectionAddress,
          functionName: "burn",
          abi: tokenErc721Abi,
          awaitReceipt: true,
          params: {
            tokenId: tokenId,
          },
        };
        const tx2: any = await Moralis.executeFunction(sendOptions4);
        await tx2.wait(1);
        await SetActivityNft(
          updatedAtHistory,
          contractType,
          to_address,
          from_address,
          tokenId.toString(),
          "",
          "",
          to_address,
          imageFileHash,
          imageFilePathIdentification,
          metadataNft,
          forSale,
          minimumBid,
          buyNowPrice.toString(),
          collectionAddress,
          new Date(createdAtHistory),
          marketType,
          "burn"
        );
        await Moralis.Cloud.run("handleBurnNft", {
          tokenId,
          collectionAddress,
        });
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetCertificates = async (skip: number) => {
    try {
      let reviewMovementCertificateCloud = await Moralis.Cloud.run(
        "reviewMovementCertificate",
        { skip }
      );
      const concatenatedArray = MovementCertificateArray.concat(
        reviewMovementCertificateCloud
      );
      ChangeMovementCertificateArray(concatenatedArray);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const GetTotalCertificates = async () => {
    try {
      let TotalMovementCertificateCloud = await Moralis.Cloud.run(
        "TotalMovementCertificate",
        {}
      );
      ChangeTotalMovementCertificateArray(TotalMovementCertificateCloud);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  async function setObjectMoralis(
    values: any,
    NftFileMetadataPath: any,
    NftFileMetadataHash: any,
    imageFilePath: any,
    imageFileHash: any,
    imageFilePathIdentification: any,
    imageFileHashIdentification: any,
    tx: any,
    nftId: any,
    nftId2: any,
    metadataNft: object,
    collectionAddress: string
  ) {
    try {
      var txFinal = {};
      if (typeof tx === "string") {
        txFinal = { symbol: tx };
      } else {
        txFinal = tx;
      }

      const tokenId =
        nftId !== undefined && nftId !== null && nftId !== "" ? nftId : nftId2;

      const price = values.price ? values.price : 0;
      const minimumBid = values.minimumBid ? values.minimumBid : 0;

      const ItemsMinted = Moralis.Object.extend("ItemsMinted");
      const newItemsMinted = new ItemsMinted();

      newItemsMinted.set("ownerAddress", ethAddress.toLowerCase());
      newItemsMinted.set("collectionAddress", collectionAddress.toLowerCase());
      newItemsMinted.set("NftFileMetadataPath", NftFileMetadataPath);
      newItemsMinted.set("NftFileMetadataHash", NftFileMetadataHash);
      newItemsMinted.set("imageFilePath", imageFilePath);
      newItemsMinted.set("imageFileHash", imageFileHash);
      newItemsMinted.set(
        "imageFilePathIdentification",
        imageFilePathIdentification
      );
      newItemsMinted.set(
        "imageFileHashIdentification",
        imageFileHashIdentification
      );
      newItemsMinted.set("tx", txFinal);
      newItemsMinted.set(
        "forSale",
        values.marketType !== "noSale" ? true : false
      );
      newItemsMinted.set("contractType", "ERC-721");
      newItemsMinted.set("buyNowPrice", parseInt(price));
      newItemsMinted.set("minimumBid", parseInt(minimumBid));
      newItemsMinted.set("royalties", 20);
      newItemsMinted.set("marketType", values.marketType.toLowerCase());
      newItemsMinted.set("tokenId", parseFloat(tokenId));
      newItemsMinted.set("type", values.typeFile);
      newItemsMinted.set("metadataNft", metadataNft);

      await newItemsMinted.save();
    } catch (error: any) {
      return error;
    }
  }
  async function setMetadata(values: any) {
    try {
      const { energy, force, impact, sustainability, valueNft, rarity, type } =
        await setTraitsMetaDataRandom();
      const data = values.NftData;
      const extension = values.typeFile;
      const dataName = values.nameNftField.replace(/ /g, "_") + "." + extension;

      const response = await useSetIpfsUploadFolder(
        ethAddress,
        data,
        dataName,
        false
      );
      const dataIdentification = values.identificationImgNft;

      const responseIdentification = await useSetIpfsUploadFolder(
        ethAddress,
        dataIdentification,
        dataIdentification.name,
        false
      );

      const imageFilePath = response.path;
      const imageFileHash = response.hash;

      const imageFilePathIdentification = responseIdentification.path;
      const imageFileHashIdentification = responseIdentification.hash;

      const metadata = {
        name: values.nameNftField,
        description: values.descriptionNft,
        energy: energy,
        force: force,
        impact: impact,
        sustainability: sustainability,
        value: valueNft,
        rarity: rarity,
        type: type,

        image: imageFilePath,
        imageHash: imageFileHash,
        imageIdentification: imageFilePathIdentification,
        imageHashIdentification: imageFileHashIdentification,
      };
      const nameFile = "metadata.json";

      const response2 = await useSetIpfsUploadFolder(
        ethAddress,
        metadata,
        nameFile,
        true
      );

      const NftFileMetadataPath = response2.path;
      const NftFileMetadataHash = response2.hash;

      return {
        imageFilePath: imageFilePath,
        imageFileHash: imageFileHash,
        imageFilePathIdentification: imageFilePathIdentification,
        imageFileHashIdentification: imageFileHashIdentification,
        NftFileMetadataPath: NftFileMetadataPath,
        NftFileMetadataHash: NftFileMetadataHash,
        metadata: metadata,
      };
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  }
  async function ensureMarketPlaceISApprovedEmail(tokenAddress: any,account) {
    try {
      const contractTokenAuction = contracts.auction.toString().toLowerCase();
      const collectionAddress = tokenAddress.toString().toLowerCase();
console.log("entro approve")
      // Verificar si el mercado está aprobado
      const approvedAddress = await publicClient.readContract({
        address: tokenAddress,
        abi: tokenErc721Abi,
        functionName: 'isApprovedForAll',
        args: [account.address, contracts.auction],
      });
      console.log("entro2 approve"+approvedAddress)

      if (!approvedAddress) {
        // Aprobar el mercado si no está aprobado
        const { request } = await publicClient.simulateContract({
          address: tokenAddress,
          abi: tokenErc721Abi,
          functionName: 'setApprovalForAll',
          args: [contracts.auction, true],
          account: account,
        });
  
        const hash = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });
        console.log("entro approve3")

      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  }
  async function ensureMarketPlaceISApproved(tokenAddress: string) {
    try {
      // Verificar si el mercado está aprobado
      const approvedAddress = await publicClient.readContract({
        address: tokenAddress,
        abi: tokenErc721Abi,
        functionName: 'isApprovedForAll',
        args: [window.ethereum.selectedAddress, contracts.auction],
      });
  
      if (!approvedAddress) {
        // Aprobar el mercado si no está aprobado
        const { request } = await publicClient.simulateContract({
          address: tokenAddress,
          abi: tokenErc721Abi,
          functionName: 'setApprovalForAll',
          args: [contracts.auction, true],
          account: window.ethereum.selectedAddress,
        });
  
        const hash = await walletClient.writeContract(request);
        await publicClient.waitForTransactionReceipt({ hash });
      }
    } catch (error: any) {
      console.error('Error en ensureMarketPlaceISApproved:', error);
      throw new Error(error.message || 'An error occurred');
    }
  }
  async function MintCreateNftEmail(metadataUrl: string, tokenAddress: string,account) {
    try {
     
      
      console.log("account ",account)

     let walletClient=await configureWalletClientPrivate(account)
     console.log("account ",tokenAddress.toString().toLowerCase())

     const { request } = await publicClient.simulateContract({   
      address: tokenAddress.toString().toLowerCase(),
      abi: tokenErc721Abi,
      functionName: 'safeMint',
      args: [
        account.address,
         metadataUrl,
        ], 
        account:account,
    });
    
    console.log(`request: ${request}`);

    // Envía la transacción
    const hash = await walletClient.writeContract(request);

    // Espera la confirmación de la transacción
    
const receipt = await publicClient.waitForTransactionReceipt( 
{ hash:hash }
)
    const tokenIdMinted = receipt.logs[0].topics[3];
      console.log(`Mint nft email into 0003`+tokenIdMinted);
      console.log(`esperar events 0 ${receipt}`);
      console.log(`Mint nft email into 0003`+parseInt(tokenIdMinted).toString());

      return parseInt(tokenIdMinted).toString(); //parseInt(tokenId.events[1].args[1]._hex, 16).toString()
    } catch (error: any) {
      console.log(`gas error ${error}`);
      console.log(`gas error JSON ${JSON.stringify(error)}`);
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      throw errorObjeto;
    }
  }
  
  const configureWalletClientPrivate = async (address) => {
    try{

    if (address) {
   console.log("address "+address)

      return createWalletClient({
        account:address,

        chain: base,
        transport: http("https://base-mainnet.infura.io/v3/7999682693a74489b8e6ab7070db18c0"),
      }).extend(publicActions) ;
    } else {
      throw new Error("wallet no está disponible");
    }
  }catch(e){
    console.log(e.message)
  }
  };

  const MintEmail = async (values: CreateNfts) => {
    try {
      ChangeIndexProcess(0);
      console.log(`Mint nft email 01`);


      var NftFileMetadataPath;
      var NftFileMetadataHash;
      var imageFilePath;
      var imageFileHash;
      var metadataNft;
      var imageFilePathIdentification;
      var imageFileHashIdentification;

      const resultMetadata = await setMetadata(values);
      NftFileMetadataPath = resultMetadata?.NftFileMetadataPath;
      NftFileMetadataHash = resultMetadata?.NftFileMetadataHash;
      imageFilePath = resultMetadata?.imageFilePath;
      imageFileHash = resultMetadata?.imageFileHash;
      imageFilePathIdentification = resultMetadata?.imageFilePathIdentification;
      imageFileHashIdentification = resultMetadata?.imageFileHashIdentification;
      metadataNft = resultMetadata?.metadata;
      console.log(`Mint nft email 04`);
      console.log(`resultMetadata => ${JSON.stringify(resultMetadata)}`);
      ChangeIndexProcess(1);
      if (values.marketType === "noSale") {
        try {
          let nftId;
          let nftId2;
          try {   
               const account = await privateKeyToAccount(privateKey);
let ethAddress=account.address
        
            nftId = await MintCreateNftEmail(
              NftFileMetadataPath,
              collectionAddress,
              account
            );
            console.log(`nftId `+nftId);
          } catch (error) {
            ChangeErrorProcess(true);
            throw new Error("Mint failed");
          }
          const tx = await publicClient.readContract({
            address: collectionAddress,
            abi: tokenErc721Abi,
            functionName: 'symbol',
          })
          console.log(`tx `+tx);

          await setObjectMoralis(
            values,
            NftFileMetadataPath,
            NftFileMetadataHash,
            imageFilePath,
            imageFileHash,
            imageFilePathIdentification,
            imageFileHashIdentification,
            tx,
            nftId,
            nftId2,
            metadataNft,
            collectionAddress
          );
          console.log(`newDate `+newDate);
          console.log(`ethAddress `+ethAddress);
          console.log(`nftId `+nftId);
          console.log(`nftId2 `+nftId2);
          console.log(`imageFileHash `+imageFileHash);
          console.log(`collectionAddress `+collectionAddress);
          console.log(`imageFileHashIdentification `+imageFileHashIdentification);

          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            nftId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            values.marketType !== "noSale" ? true : false,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "createNft"
          );
          console.log(`nftId `+nftId);
          console.log(`contracts.collection.toLowerCase() `+contracts.collection.toLowerCase());

          return [nftId, contracts.collection.toLowerCase()];
        } catch (error) {
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          throw errorObject;
        }
      } else {
        let res;
        var ethInWei2;
        let nftId;
        let nftId2;
        try {
          
          const account = await privateKeyToAccount(privateKey);
          let ethAddress=account.address
                  
          nftId = await MintCreateNftEmail(
            NftFileMetadataPath,
            collectionAddress,
            account
          );
          ChangeIndexProcess(2);

          res = await ensureMarketPlaceISApprovedEmail(collectionAddress,account);

console.log("llego aqui")
          const ethInWei = Moralis.Units.ETH(values.price.toString());
          console.log("llego aqui "+ethInWei)

          if (
            values.marketType !== "fixed" &&
            values.marketType !== "noSale" &&
            values.minimumBid !== 0 &&
            values.minimumBid !== undefined
          ) {
            ethInWei2 = Moralis.Units.ETH(values.minimumBid.toString());
          }
          console.log("llego aqui3")

          if (values.marketType === "fixed") {
            try {
              console.log("llego aqui4")
              let walletClient=await configureWalletClientPrivate(account)
              ChangeIndexProcess(3);

              const { request } = await publicClient.simulateContract({
                abi: auctionsAbi,
                address: contracts.auction,
                functionName: 'createSale',
                args: [
                  collectionAddress,
                  parseInt(nftId),
                  contracts.token,
                  ethInWei,
                  '0x0000000000000000000000000000000000000000',
                  [creator.owner],
                  [20],
                ],
                account: account,
              });
              console.log("llego aqui6")

             let tx=  await walletClient.writeContract(request);
             console.log("llego aqui32 "+tx)
             ChangeIndexProcess(4);

              await setObjectMoralis(
                values,
                NftFileMetadataPath,
                NftFileMetadataHash,
                imageFilePath,
                imageFileHash,
                imageFilePathIdentification,
                imageFileHashIdentification,
                tx,
                nftId,
                nftId2,
                metadataNft,
                collectionAddress
              );
              console.log("llego aqui7")

              await SetActivityNft(
                newDate,
                "ERC-721",
                ethAddress,
                ethAddress,
                "",
                nftId,
                nftId2,
                ethAddress,
                imageFileHash,
                imageFileHashIdentification,
                metadataNft,
                true,
                values.minimumBid.toString(),
                values.price.toString(),
                collectionAddress,
                newDate,
                values.marketType,
                "createNft"
              );
              console.log("llego aqui9")

            } catch (error) {
              const errorMessage = JSON.stringify(error);
              const errorObject = JSON.parse(errorMessage);
              throw errorObject.message;
            }
          } else {
            try {
              let walletClient=await configureWalletClientPrivate(account)
              ChangeIndexProcess(3);

              const { request } = await publicClient.simulateContract({
                abi: auctionsAbi,
                address: contracts.auction,
                functionName: 'createDefaultNftAuction',
                args: [
                  collectionAddress,
                  nftId,
                  contracts.token,
                  ethInWei2,
                  ethInWei,
                  [creator.owner],
                  [20]
                ],
                account: account,
              });
              console.log("llego aqui6")

             let tx=  await walletClient.writeContract(request);

             ChangeIndexProcess(4);

              await setObjectMoralis(
                values,
                NftFileMetadataPath,
                NftFileMetadataHash,
                imageFilePath,
                imageFileHash,
                imageFilePathIdentification,
                imageFileHashIdentification,
                tx,
                nftId,
                nftId2,
                metadataNft,
                collectionAddress
              );
              await SetActivityNft(
                newDate,
                "ERC-721",
                ethAddress,
                ethAddress,
                "",
                nftId,
                nftId2,
                ethAddress,
                imageFileHash,
                imageFileHashIdentification,
                metadataNft,
                true,
                values.minimumBid.toString(),
                values.price.toString(),
                collectionAddress,
                newDate,
                values.marketType,
                "createNft"
              );
            } catch (error) {
              const errorMessage = JSON.stringify(error);
              const errorObject = JSON.parse(errorMessage);
              throw errorObject.message;
            }
          }
          return [nftId2 ? nftId2 : nftId, contracts.collection.toLowerCase()];
        } catch (error: any) {
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          throw errorObject.message;
        }
      }
    } catch (error: any) {
      console.log(`Init error ${error}`);
      console.log(`Init error json ${JSON.stringify(error)}`);
      ChangeErrorProcess(true);
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  async function mintNFTMetamask(metadataUrl: string, tokenAddress: string) {
    let royal = "20";
    try {
      console.log(`into mintNFTMetamask 01 `);
      const sendOptions = {
        contractAddress: tokenAddress.toString().toLowerCase(),
        functionName: "createItem",
        abi: tokenErc721Abi,
        params: {
          _req: [
            ethAddress,
            ethAddress,
            parseFloat(royal) * 2000,
            ethAddress,
            metadataUrl,
            0,
            contracts.token,
            "0",
            "0",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          ],
        },
      };
      console.log(`into mintNFTMetamask 02 `);

      const tx: any = await Moralis.executeFunction(sendOptions);
      console.log(`into mintNFTMetamask 03 `);

      const result = await tx.wait(1);
      console.log(`into mintNFTMetamask 04`);

      return parseInt(result.events[1].args[1]._hex, 16).toString();
    } catch (error: any) {
      console.log(`error fase 2 is ${error}`);
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      throw errorObjeto;
    }
  }
  const SetPutBackOnSale = async (
    collectionAddress: any,
    tokenId: any,
    minimumBid: any,
    price: any,
    fileType: any
  ): Promise<void> => {
    const finalMinimumBid = minimumBid ? minimumBid : 0;
    const finalPrice = price ? price : 0;

    try {
      const query = new Moralis.Query("ItemsMinted");
      query.equalTo("collectionAddress", collectionAddress);
      query.equalTo("tokenId", tokenId);
      const object = await query.first({ useMasterKey: true });

      object?.set("forSale", true);
      object?.set("minimumBid", parseInt(finalMinimumBid));
      object?.set("buyNowPrice", parseInt(finalPrice));
      object?.set("marketType", fileType);

      await object?.save(null, { useMasterKey: true });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  // Crear los clientes publicClient y walletClient
  
  const waitForReceipt = async (transactionHash: string) => {
    while (true) {
      const receipt = await publicClient.getTransactionReceipt({ hash: transactionHash });
      if (receipt) {
        return receipt;
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de volver a verificar
    }
  };
  
  const MintMetamask = async (values: CreateNfts) => {
    try {
      var NftFileMetadataPath;
      var NftFileMetadataHash;
      var imageFilePath;
      var imageFileHash;
      var metadataNft;
      var imageFilePathIdentification;
      var imageFileHashIdentification;
      var resultMetadata = await setMetadata(values);
  
      NftFileMetadataPath = resultMetadata?.NftFileMetadataPath;
      NftFileMetadataHash = resultMetadata?.NftFileMetadataHash;
      imageFilePath = resultMetadata?.imageFilePath;
      imageFileHash = resultMetadata?.imageFileHash;
      imageFilePathIdentification = resultMetadata?.imageFilePathIdentification;
      imageFileHashIdentification = resultMetadata?.imageFileHashIdentification;
      metadataNft = resultMetadata?.metadata;
      console.log(`init MintMetamask `);
  
      if (values.marketType === "noSale") {
        try {
          console.log(`init MintMetamask noSale`);
          ChangeIndexProcess(1);
  
          console.log(`init MintMetamask noSale 2`);
          console.log(`init MintMetamask imageFilePath ${imageFilePath}`);
          console.log(
            `init MintMetamask imageFilePathIdentification ${imageFilePathIdentification}`
          );
  
          console.log(
            `init MintMetamask NftFileMetadataPath ${NftFileMetadataPath}`
          );
          console.log(
            `init MintMetamask collectionAddress profile NFT ${collectionAddress}`
          );
  
          console.log(
            `init MintMetamask collectionAddress ${contracts?.collection}`
          );
  
          let nftId: any = await MintNFT(NftFileMetadataPath, collectionAddress);
          console.log(`init MintMetamask noSale 3`);
  
          let nftId2 = "";
  
          const symbol = await publicClient.readContract({
            abi: tokenErc721Abi,
            address: collectionAddress.toLowerCase(),
            functionName: "symbol",
          });
  
          console.log(`init MintMetamask noSale 4`);
          ChangeIndexProcess(2);
          console.log(`init MintMetamask noSale 5`);
  
          await setObjectMoralis(
            values,
            NftFileMetadataPath,
            NftFileMetadataHash,
            imageFilePath,
            imageFileHash,
            imageFilePathIdentification,
            imageFileHashIdentification,
            symbol,
            nftId,
            nftId2,
            metadataNft,
            collectionAddress
          );
  
          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            nftId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            values.marketType !== "noSale" ? true : false,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "createNft"
          );
  
          ChangeIndexProcess(3);
          return [nftId, collectionAddress];
        } catch (error) {
          console.log(`error fase 3 ${error}`);
          ChangeErrorProcess(true);
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          console.log(`error fase 3 ${errorObject}`);
          throw errorObject;
        }
      } else {
        ChangeIndexProcess(1);
  
        let ethInWei2;
        let nftId;
        let nftId2 = "";
        try {
          nftId = await MintNFT(NftFileMetadataPath, collectionAddress);
          await ensureMarketPlaceISApproved(collectionAddress,);
          const ethInWei = parseEther(values.price.toString());
  
          if (
            values.marketType !== "fixed" &&
            values.marketType !== "noSale" &&
            values.minimumBid !== 0 &&
            values.minimumBid !== undefined
          ) {
            ethInWei2 = parseEther(values.minimumBid.toString());
          }
  
          ChangeIndexProcess(2);
  
          let tx;
          if (values.marketType === "fixed") {  
              const { request } = await publicClient.simulateContract({
            abi: auctionsAbi,
            address: contracts.auction,
            functionName: 'createSale',
            args: [
              collectionAddress,
              parseInt(nftId),
              contracts.token,
              ethInWei,
              '0x0000000000000000000000000000000000000000',
              [creator.owner],
              [20],
            ],
            account: window.ethereum.selectedAddress,
          });
      
           await walletClient.writeContract(request);
          }
  
          if (values.marketType === "bids") {  
            const { request } = await publicClient.simulateContract({
            abi: auctionsAbi,
            address: contracts.auction,
            functionName: 'createDefaultNftAuction',
            args: [
              collectionAddress,
              parseInt(nftId),
              contracts.token,
              ethInWei2,
              ethInWei,
              [creator.owner],
              [20],
            ],
            account: window.ethereum.selectedAddress,
          });
      
           await walletClient.writeContract(request);
          }
  
          ChangeIndexProcess(3);
  
          await setObjectMoralis(
            values,
            NftFileMetadataPath,
            NftFileMetadataHash,
            imageFilePath,
            imageFileHash,
            imageFilePathIdentification,
            imageFileHashIdentification,
            tx,
            nftId,
            nftId2,
            metadataNft,
            collectionAddress
          );
  
          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            nftId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            true,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "createNft"
          );
  
          ChangeIndexProcess(4);
          return [nftId, collectionAddress];
        } catch (error: any) {
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          throw errorObject.message;
        }
      }
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  
  
  const MintNft = async (
    values: CreateNfts
  ): Promise<[string, string] | void> => {
    try {
      if (!UserRender) {
        throw "user not logged in";
      }
      switch (values.marketType) {
        case "noSale":
          ChangeTypeStepper(TypeStepperNoSale);
          break;
        case "fixed": {
          ChangeTypeStepper(TypeStepperSale);
        }
        default:
      }
      ChangeOpenStepper(true);
      console.log(`init mint `);
      if (LoginType == "email") {
        console.log(`init mint type ${LoginType} `);
        let result: any = await MintEmail(values);
        ChangeIndexProcess(4);
        ChangeOpenStepper(false);
        return result;
      } else {
        console.log(`init mint `);
        console.log(`init mint metamask `);
        let result: any = await MintMetamask(values);
        ChangeIndexProcess(4);
        ChangeOpenStepper(false);
        return result;
      }
    } catch (error: any) {
      console.log(`error is mint ${JSON.stringify(error)}`);
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject;
    }
  };
  const MintPlaceForSaleBidsFunctionEmail = async (
    values: PlaceForSaleBids
  ) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        `${urlProvider}${apiAlchemy}`
      );
      const signer = new ethers.Wallet(privateKey, provider);
      let res;
      var ethInWei2;
      let nftId2;
      res = await ensureMarketPlaceISApprovedEmail(collectionAddress);
      const ethInWei = Moralis.Units.ETH(values.price.toString());
      if (
        values.marketType !== "fixed" &&
        values.minimumBid !== 0 &&
        values.minimumBid !== undefined
      ) {
        ethInWei2 = Moralis.Units.ETH(values.minimumBid.toString());
      }
      var tx;
      if (values.marketType === "fixed") {
        try {
          const contract = new ethers.Contract(
            contracts.auction,
            auctionsAbi,
            provider
          );
          const tx = await contract
            .connect(signer)
            .createSale(
              collectionAddress,
              parseInt(tokenId),
              contracts.token,
              ethInWei,
              "0x0000000000000000000000000000000000000000",
              [creator.owner],
              [20]
            );
          await tx.wait(2);
          await SetPutBackOnSale(
            collectionAddress,
            tokenId,
            values.minimumBid,
            values.price,
            values.marketType
          );
          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            tokenId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            true,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "re-sold"
          );
        } catch (error) {
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          throw errorObject.message;
        }
      }
      if (values.marketType === "bids") {
        try {
          const contract = new ethers.Contract(
            contracts.auction,
            auctionsAbi,
            provider
          );
          tx = await contract
            .connect(signer)
            .createDefaultNftAuction(
              collectionAddress,
              tokenId,
              contracts.token,
              ethInWei2,
              ethInWei,
              [creator.owner],
              [20]
            );
          await tx.wait(2);
          await SetPutBackOnSale(
            collectionAddress,
            tokenId,
            values.minimumBid,
            values.price,
            values.marketType
          );

          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            tokenId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            true,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "re-auctioned"
          );
          return [
            nftId2 ? nftId2 : tokenId,
            contracts.collection.toLowerCase(),
          ];
        } catch (error) {
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          throw errorObject.message;
        }
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const MintPlaceForSaleBidsFunctionMetamask = async (
    values: PlaceForSaleBids
  ) => {
    try {
      let res;
      let sendOptions: any;
      let ethInWei2;
      let nftId2: any = "";
      res = await ensureMarketPlaceISApproved(collectionAddress);
      const ethInWei = Moralis.Units.ETH(values.price);
      if (
        values.marketType !== "fixed" &&
        values.minimumBid !== 0 &&
        values.minimumBid !== undefined
      ) {
        ethInWei2 = Moralis.Units.ETH(values.minimumBid);
      }
      if (values.marketType === "fixed") {
        sendOptions = {
          contractAddress: contracts.auction,
          functionName: "createSale",
          abi: auctionsAbi,
          awaitReceipt: true,
          params: {
            _nftContractAddress: collectionAddress,
            _tokenId: parseInt(tokenId),
            _erc20Token: contracts.token,
            _buyNowPrice: ethInWei,
            _whitelistedBuyer: "0x0000000000000000000000000000000000000000",
            _feeRecipients: [creator.owner],
            _feePercentages: [20],
          },
        };
      }
      if (values.marketType === "bids") {
        sendOptions = {
          contractAddress: contracts.auction,
          functionName: "createDefaultNftAuction",
          abi: auctionsAbi,
          awaitReceipt: true,
          params: {
            _nftContractAddress: collectionAddress,
            _tokenId: parseInt(tokenId),
            _erc20Token: contracts.token,
            _minPrice: ethInWei2,
            _buyNowPrice: ethInWei,
            _feeRecipients: [creator.owner],
            _feePercentages: [20],
          },
        };
      }
      try {
        const tx: any = await Moralis.executeFunction(sendOptions);
        await tx.wait(2);
        if (values.marketType === "fixed") {
          await SetPutBackOnSale(
            collectionAddress,
            tokenId,
            values.minimumBid,
            values.price,
            values.marketType
          );

          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            tokenId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            true,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "re-sold"
          );
        }
        if (values.marketType === "bids") {
          await SetPutBackOnSale(
            collectionAddress,
            tokenId,
            values.minimumBid,
            values.price,
            values.marketType
          );
          await SetActivityNft(
            newDate,
            "ERC-721",
            ethAddress,
            ethAddress,
            "",
            tokenId,
            nftId2,
            ethAddress,
            imageFileHash,
            imageFileHashIdentification,
            metadataNft,
            true,
            values.minimumBid.toString(),
            values.price.toString(),
            collectionAddress,
            newDate,
            values.marketType,
            "re-auctioned"
          );
        }
        return [tokenId, collectionAddress];
      } catch (error) {
        const errorMessage = JSON.stringify(error);
        const errorObject = JSON.parse(errorMessage);
        throw errorObject.message;
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const MintNftPlaceForSaleBids = async (values: PlaceForSaleBids) => {
    try {
      if (!UserRender) {
        throw "user not logged in";
      }
      if (LoginType == "email") {
        let result: any = await MintPlaceForSaleBidsFunctionEmail(values);
        return result;
      } else {
        let result: any = await MintPlaceForSaleBidsFunctionMetamask(values);
        return result;
      }
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };

  return (
    <MintContext.Provider
      value={{
        HandleBidMail,
        HandleBid,
        HandleRemoveRule,
        OnBuyRule,
        SetActivityNft,
        HandleHighestRule,
        HandleBurnRule,
        GetCertificates,
        GetTotalCertificates,
        MintNft,
        MintNftPlaceForSaleBids,
      }}
    >
      {props.children}
    </MintContext.Provider>
  );
};

export default MintState;
