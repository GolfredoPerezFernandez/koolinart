import { createContext } from "react";
// import { Moralis } from "moralis-v1";
import { useMoralis } from "react-moralis";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { tokenAbicode, tokenErc721Abi } from "@/config/abi";
import Web3 from "web3";
import useSetIpfsUploadFolder from "@/hooks/useSetIpfsUploadFolder";
import { createPublicClient, createWalletClient, custom, http, publicActions } from "viem";
import { base } from "viem/chains";
import { byteCodeTokenERC721 } from "@/config/byteCodesSmartContract/byteCodeTokenERC721";
import { tokenErc721Abi2 } from "@/config/abi";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";

interface CreateCollectionValues {
  theFile: undefined | File;
  nameCollection: string;
  symbol: string;
  descriptionCollection: string;
}

type CreateNftContextType = {
  GetCollectionItemsCreateNft: () => Promise<void>;
  CreateCollection: (value: CreateCollectionValues) => Promise<void>;
  SetCollectionFilePath: (collection: string) => Promise<void>;
} | null;
const publicClient = createPublicClient({
  chain: base,
  transport: http(`https://base-mainnet.infura.io/v3/7999682693a74489b8e6ab7070db18c0`)
});
 

export const CreateNftContext = createContext<CreateNftContextType>(null);

const CreateNftState = (props: { children: any }) => {
  const {
    ChangeCollectionsItems,
    UserRender,
    LoginType,
    ChangeCollectionFilePath,
    ChangeOpenStepper,
    ChangeTypeStepper,
    ChangeIndexProcess,
    ChangeErrorProcess,
    TypeStepperCollection,
  } = useBoundStore((state: any) => state, shallow);
  const { Moralis }: any = useMoralis();
  const ethers = Moralis.web3Library;
  const mnemonic = UserRender.attributes?.mnemonic
    ? UserRender.attributes.mnemonic
    : "";
    const privateKey = UserRender.attributes?.privateKey
    ? UserRender.attributes.privateKey
    : "";
  const ethAddress = UserRender.attributes?.ethAddress
    ? UserRender.attributes.ethAddress.toString().toLowerCase()
    : "";

  const GetCollectionItemsCreateNft = async () => {
    try {
      let resultCollection: any = await Moralis.Cloud.run(
        "getCollectionSelect",
        { userAddress: ethAddress }
      );
      ChangeCollectionsItems(resultCollection);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  const SetCollectionFilePath = async (collection: string) => {
    try {
      let resultCollection: any = await Moralis.Cloud.run(
        "setColletionFilePath",
        { collection }
      );
      ChangeCollectionFilePath(resultCollection);
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };
  
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

  const CreateCollection = async (values: CreateCollectionValues) => {

    try {
      if (!UserRender) {
        throw "unsuccessful user";
      }
      ChangeTypeStepper(TypeStepperCollection);
      ChangeOpenStepper(true);
      ChangeIndexProcess(0);

      if (LoginType === "email") {
        try {
          console.log(`values collections ${JSON.stringify(values)}`);

         
      
          console.log("values.symbol ",values.symbol)
          console.log("values.nameCollection ",values.symbol)
          
          const account = await privateKeyToAccount(privateKey);
          console.log("account ",account)

         let walletClient=await configureWalletClientPrivate(account)
          console.log("walletClient ",account.address)

          const hash = await walletClient.deployContract({
            abi: tokenErc721Abi2,
            account: account,
            args: [account.address,values.nameCollection, values.symbol],

            bytecode: byteCodeTokenERC721, // Asegúrate de tener el bytecode correcto aquí
          });
          console.log("hash1 ",hash)

          let res= await waitForReceipt(hash);

          console.log("hash2 ",res.logs[0].address)
          let name = values.nameCollection;
          let symbol = values.symbol;
          let nameWithoutSpace = name.split(" ").join("");
          const data = values.theFile;
          console.log(`values ethAddress ${ethAddress}`);

          const response = await useSetIpfsUploadFolder(
            ethAddress,
            data,
            `avatarCollect-${nameWithoutSpace}.jpg`,
            false
          );
          const filePath = await response.path;
          const fileHash = await response.hash;
          console.log(`values response json ${JSON.stringify(response)}`);

          ChangeIndexProcess(1);

          const Collection = Moralis.Object.extend("CollectionsPolygon");
          const collec = new Collection();
          collec.set("name", name);
          collec.set("symbol", symbol);
          collec.set("description", values.descriptionCollection);
          collec.set("owner", ethAddress);
          collec.set("fileHash", fileHash);
          collec.set("filePath", filePath);
          collec.set("collectionAddress", res.logs[0].address);
          ChangeIndexProcess(2);
          await collec.save();
          ChangeIndexProcess(3);
        } catch (error) {
          ChangeErrorProcess(true);
          const errorMessage = JSON.stringify(error);
          const errorObject = JSON.parse(errorMessage);
          console.log(errorMessage)
          throw errorObject.message;
        }
      } else {
        
try {
        const walletClient = await configureWalletClient();

       

 
      
        ChangeIndexProcess(1);
          // Desplegar el contrato
  const hash = await walletClient.deployContract({
    abi: tokenErc721Abi2,
    bytecode: byteCodeTokenERC721, // Asegúrate de tener el bytecode correcto aquí
    account: ethAddress,
    args: [ethAddress,values.nameCollection, values.symbol],
  });
 let res= await waitForReceipt(hash);

console.log("hash ",res.logs[0].address)

      //console.log("tokenIdMinted "+JSON.stringify(receipt))
       
              const data = values.theFile;
              const response = await useSetIpfsUploadFolder(
                ethAddress,
                data,
                `avatarCollect-${values.nameCollection
                  .split(" ")
                  .join("")}.jpg`,
                false
              );

              const filePath = await response.path;
              const fileHash = await response.hash;
              const Collection = Moralis.Object.extend("CollectionsPolygon");
              const collec = new Collection();
              collec.set("name", values.nameCollection);
              collec.set("symbol", values.symbol);
              collec.set("description", values.descriptionCollection);
              collec.set("owner", ethAddress);
              collec.set("fileHash", fileHash);
              collec.set("filePath", filePath);
              collec.set(
                "collectionAddress",
                res.logs[0].address
              );
              ChangeIndexProcess(2);

              await collec.save();

              ChangeIndexProcess(3);
            } catch (error: any) {
              const errorMessage = JSON.stringify(error);
              const errorObjeto = JSON.parse(errorMessage);
              throw errorObjeto.message;
            }
          ;
      }
      ChangeOpenStepper(false);
    } catch (error: any) {
      ChangeErrorProcess(true);
      const errorMessage = JSON.stringify(error);
      const errorObject = JSON.parse(errorMessage);
      throw errorObject.message;
    }
  };

  const waitForReceipt = async (transactionHash: `0x${string}`) => {
    try {
      let res=await publicClient.waitForTransactionReceipt({ hash: transactionHash });
      return res
    } catch (error) {
      console.error("Error waiting for transaction receipt:", error.message);
      throw error;
    }
  };

  return ( 
    <CreateNftContext.Provider
      value={{
        GetCollectionItemsCreateNft,
        CreateCollection,
        SetCollectionFilePath,
      }}
    >
      {props.children}
    </CreateNftContext.Provider>
  );
};

export default CreateNftState;
