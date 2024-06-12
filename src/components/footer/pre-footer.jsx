import { Box, Typography } from "@mui/material";
import {
  AccountBalanceWalletOutlined,
  AddPhotoAlternateOutlined,
  LocalOfferOutlined,
  LibraryAddOutlined,
} from "@mui/icons-material/";

function StyledContainer() {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: { xs: "center", sm: "space-around", lg: "space-between" },
    my: { xs: "20px", md: "30px", lg: "35px" },
    gap: "25px",
  };
}
function StyledTitleTypography() {
  return {
    color: "text.secondary",
    textAlign: "center",
  };
}
function StyledContentTypography() {
  return {
    color: "text.secondary",
    textAlign: "center",
  };
}
function StyledContainerData() {
  return {
    width: { xs: "290px", md: "340px", lg: "270px", xl: "350px" },
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  };
}
function StyledIcon() {
  return {
    color: "common.white",
    fontSize: "50px",
    transition: "0.4s",
    backgroundColor: "secondary.main",
    borderRadius: "10px",
    p: "5px",
    border: "3px solid",
    borderColor: "common.two",
  };
}

export default function PreFooter() {
  return (
    <Box sx={StyledContainer}>
      <Box sx={StyledContainerData}>
        <AccountBalanceWalletOutlined sx={StyledIcon} />
        <Typography variant="h2" sx={StyledTitleTypography}>
          Set up your wallet
        </Typography>
        <Typography variant="body1" sx={StyledContentTypography}>
          Digital marketplace for crypto collectibles and non-fungible tokens
          (NFTS). Buy, sell, and discover exclusive digital assets.
        </Typography>
      </Box>
      <Box sx={StyledContainerData}>
        <LibraryAddOutlined sx={StyledIcon} />
        <Typography variant="h2" sx={StyledTitleTypography}>
          Create your Collection
        </Typography>
        <Typography variant="body1" sx={StyledContentTypography}>
          Create and configure your collection. Set a description, place a
          banner image and profile and assign a selling rate.
        </Typography>
      </Box>
      <Box sx={StyledContainerData}>
        <AddPhotoAlternateOutlined sx={StyledIcon} />
        <Typography variant="h2" sx={StyledTitleTypography}>
          Add your NFTS
        </Typography>
        <Typography variant="body1" sx={StyledContentTypography}>
          Upload your work, add a title and description, customize your NFTS
          with properties like: Energy, Strength, Impact, Sustainability, value
          and rarity.
        </Typography>
      </Box>
      <Box sx={StyledContainerData}>
        <LocalOfferOutlined sx={StyledIcon} />
        <Typography variant="h2" sx={StyledTitleTypography}>
          List them for sale
        </Typography>
        <Typography variant="body1" sx={StyledContentTypography}>
          Choose from auctions, timed auctions and fixed price ads. Decide how
          you want to sell your NFTS and don't worry, we'll help you sell them.
        </Typography>
      </Box>
    </Box>
  );
}
