import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { ArtistContext } from "@/context/Artist/ArtistContext";
import { FollowContext } from "@/context/Follow/FollowContext";

import CardProfileUser from "@/components/cards/cardProfileUser";
import ArtistInf from "@/components/cards/profileArtistInf";
import ArtistFollowAndShare from "@/components/cards/cardProfileArtistFollowAndShare";
import TabsGlobal from "@/components/tabs/tabsGlobal";
import ButtonUp from "@/components/buttons/buttonUp";

function StyledBoxContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "10px", md: "15px", lg: "15px" },
    mb: { xs: "20px", md: "30px", lg: "40px" },
  };
}
export default function ProfileArtist() {
  const { ethAddress } = useParams();
  const {
    ArtistData,
    ChangeArtistEthAddress,
    ChangeArtistOwned,
    ChangeArtistTotalOwned,
  } = useBoundStore((state) => state, shallow);
  const { GetProfileArtist } = useContext(ArtistContext);
  const { ShowFollowerOrFollowingInfoPerfilArtist } = useContext(FollowContext);

  let banner_koolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg";
  let bannerUser = ArtistData?.userBanner
    ? ArtistData.userBanner
    : banner_koolinart;

  useEffect(() => {
    async function fetchNft() {
      ChangeArtistEthAddress(ethAddress);
      await GetProfileArtist(ethAddress);
      await ShowFollowerOrFollowingInfoPerfilArtist(ethAddress);
    }
    fetchNft();
    return async () => {
      ChangeArtistOwned([]);
      ChangeArtistTotalOwned(0);
    };
  }, []);

  return (
    <Box sx={StyledBoxContainer}>
      <ButtonUp />
      <CardMedia
        component="img"
        image={bannerUser}
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
            height: { xs: "450px", md: "450px", lg: "450px", xl: "500px" },
            top: "270px",
            px: { xs: "0px", sm: "40px", md: "80px", lg: "120px", xl: "300px" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: { xs: "-170px", sm: "-170px", md: "-170px", lg: "-170px" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <CardProfileUser dataObjNft={ArtistData} />
            <ArtistFollowAndShare dataObj={ArtistData} />
            <ArtistInf dataObj={ArtistData} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabsGlobal titlesTabs="profileArtist" />
        </Box>
      </Box>
    </Box>
  );
}
