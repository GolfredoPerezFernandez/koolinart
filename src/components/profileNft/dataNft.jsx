import ButtonDownload from "@/components/buttons/buttonDownload";
import ButtonLikes from "@/components/buttons/buttonLikes";
import ButtonShare from "@/components/buttons/buttonShare";
import CardOwner from "@/components/cards/CardOwner";
import CardOwnerCollection from "@/components/cards/CardOwnerCollection";
import OptionNfts from "@/components/profileNft/optionsNft";
import { useBoundStore } from "@/store/index";
import { Box, Card, Tooltip, Typography } from "@mui/material";
import { shallow } from "zustand/shallow";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    position: "sticky",
    height: "fit-content",
    width: { xs: "250px", sm: "280px", md: "300px", lg: "360px" },
    top: "100px",
  };
}
function StyledData() {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };
}
function StyledDataSecondary() {
  return {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  };
}
function StyledContainerCard() {
  return {
    backgroundColor: "background.default",
    display: "flex",
    width: { xs: "250px", sm: "280px", md: "300px", lg: "360px" },
    justifyContent: "space-around",
    borderRadius: "35px",
    p: "15px",
  };
}

export default function Datanft() {
  const {
    name,
    tokenId,
    description,
    collectionAddress,
    imageFilePath,
    userAvatar,
    ownerAddress,
    fileHash,
  } = useBoundStore(
    (state) => ({
      name: state.ProfileNft?.metadataNft?.name,
      tokenId: state.ProfileNft?.tokenId
        ? state.ProfileNft.tokenId
        : state.ProfileNft?.tokenIdAdmin
        ? state.ProfileNft.tokenIdAdmind
        : "0",
      description: state.ProfileNft?.metadataNft?.description,
      collectionAddress: state.ProfileNft?.collectionAddress,
      imageFilePath: state.ProfileNft?.imageFilePath,
      userAvatar: state.ProfileNft?.userAvatar
        ? state.ProfileNft?.userAvatar
        : "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg",
      ownerAddress: state.ProfileNft?.ownerAddress
        ? state.ProfileNft?.ownerAddress
        : "",
      fileHash: state?.ProfileNft?.fileHash
        ? `https://ipfs.moralis.io:2053/ipfs/${state.ProfileNft?.fileHash}`
        : "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg",
    }),
    shallow
  );

  return (
    <Box sx={StyledContainer}>
      <Box sx={StyledData}>
        <Tooltip title={name} followCursor>
          <Typography
            variant="cardNftName"
            sx={{
              color: "text.secondary",
            }}
          >
            {name}
          </Typography>
        </Tooltip>
        <Tooltip title={tokenId} followCursor>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
            }}
          >
            ID: {tokenId}
          </Typography>
        </Tooltip>
        <Tooltip title={description} followCursor>
          <Typography
            variant="body1"
            sx={{
              textWrap: "balance",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            description: {description}
          </Typography>
        </Tooltip>
      </Box>
      <Box sx={StyledDataSecondary}>
        <ButtonLikes token={tokenId} collectionAddress={collectionAddress} />
        <ButtonShare
          myShareUrl={`https://www.koolinart.com/perfil-nft/${collectionAddress}/${tokenId}`}
        />
        <ButtonDownload file={imageFilePath} />
      </Box>
      <Card sx={StyledContainerCard}>
        <CardOwner
          title="OWNER"
          avatarOwner={userAvatar}
          directionAddress={ownerAddress}
        />
        <CardOwnerCollection
          title="COLLECTION"
          avatarOwner={fileHash}
          directionAddress={collectionAddress}
        />
      </Card>
      <OptionNfts />
    </Box>
  );
}
