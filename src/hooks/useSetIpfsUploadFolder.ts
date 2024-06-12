import Moralis from "moralis";
/**
 * The function `readAsBase64` takes a file as input and returns a promise that resolves with the
 * base64 representation of the file.
 * @param {any} file - The `file` parameter is the file object that you want to read as base64. It can
 * be obtained from an input element of type "file" or from a drag and drop event.
 * @returns The function `readAsBase64` returns a Promise.
 */
const readAsBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      } else {
        reject(new Error("Error al leer el archivo."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error al leer el archivo."));
    };
    reader.readAsDataURL(file);
  });
};
/**
 * The function `removeBaseUrl` removes the base URL from a given URL string.
 * @param {string} url - The `url` parameter is a string representing a URL.
 * @returns The function `removeBaseUrl` returns a modified version of the `url` parameter, where the
 * base URL `https://ipfs.moralis.io:2053/ipfs/` is removed from the beginning of the string.
 */
const removeBaseUrl = (url: string) => {
  const baseUrl = "https://ipfs.moralis.io:2053/ipfs/";
  return url.replace(new RegExp(`^${baseUrl}`), "");
};
/**
 * The function `useSetIpfsUploadFolder` is a TypeScript function that uploads content to IPFS and
 * returns the path and hash of the uploaded content.
 * @param {any} ethAddress - The Ethereum address of the user.
 * @param {any} content - The `content` parameter is the content that you want to upload to IPFS. It
 * can be either an object for NFTs or a file for regular uploads.
 * @param {string} contentName - The name of the content being uploaded.
 * @param {boolean} ifNft - A boolean value indicating whether the content is an NFT or not.
 * @returns The function `useSetIpfsUploadFolder` returns an object with properties `path` and `hash`.
 */
const useSetIpfsUploadFolder = async (
  ethAddress: any,
  content: any,
  contentName: string,
  ifNft: boolean
) => {
  try {
    if (ifNft) {
      const abi: any = [
        {
          path: contentName,
          content: {
            name: content.name,
            description: content.description,
            image: content.image,
            attributes: [
              {
                trait_type: "energy",
                value: content.energy,
              },
              {
                trait_type: "force",
                value: content.force,
              },
              {
                trait_type: "impact",
                value: content.impact,
              },
              {
                trait_type: "sustainability",
                value: content.sustainability,
              },
              {
                trait_type: "value",
                value: content.valueNft,
              },
              {
                trait_type: "rarity",
                value: content.rarity,
              },
              {
                trait_type: "type",
                value: content.type,
              },
            ],
          },
        },
      ];

      const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
      const responseUrl = response.raw;
      const path = responseUrl[0].path;
      const hash = removeBaseUrl(path);
      return { path, hash };
    } else {
      try {
        const base64Data = (await readAsBase64(content)) as string;
        const fileUpload = [
          {
            path: `${ethAddress}/${contentName}`,
            content: base64Data.toString(),
          },
        ];
        const response = await Moralis.EvmApi.ipfs.uploadFolder({
          abi: fileUpload,
        });
        const responseUrl = response.raw;
        const path = responseUrl[0].path;
        const hash = removeBaseUrl(path);
        return { path, hash };
      } catch (error) {
        throw error;
      }
    }
  } catch (error: any) {
    return error;
  }
};
export default useSetIpfsUploadFolder;
