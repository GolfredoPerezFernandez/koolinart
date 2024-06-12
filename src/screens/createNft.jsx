import { Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import CardPreview from "@/components/cards/cardPreview";
import TabsCreateNft from "@/components/tabs/tabsCreateNft";

function StyledBoxContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "10px", md: "15px", lg: "15px" },
    mb: { xs: "20px", md: "30px", lg: "40px" },
  };
}
export default function CreateNft() {
  const { CollectionFilePath } = useBoundStore((state) => state, shallow);
  let banner_koolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg";
  let bannerCollection = CollectionFilePath
    ? CollectionFilePath
    : banner_koolinart;
  return (
    <Box sx={StyledBoxContainer}>
      <CardMedia
        component="img"
        image={bannerCollection}
        alt="Logo"
        sx={{
          width: "100%",
          height: { xs: "280px", lg: "350px", xl: "450px" },
          objectFit: "cover",
          borderRadius: { xs: "0px 0px 30px 30px", sm: "0px 0px 50px 50px" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
          flexDirection: { xs: "Column", sm: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "fit-content" },
            position: { xs: "static", sm: "sticky" },
            height: { xs: "300px", sm: "fit-content" },
            top: "280px",
            px: { xs: "0px", sm: "40px", md: "80px", lg: "120px", xl: "200px" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: { xs: "-170px", sm: "-170px", md: "-170px", lg: "-170px" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardPreview />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <TabsCreateNft />
        </Box>
      </Box>
    </Box>
  );
}
