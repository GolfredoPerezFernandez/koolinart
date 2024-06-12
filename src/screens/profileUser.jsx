import { useContext, useEffect } from "react";
import { Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { FollowContext } from "@/context/Follow/FollowContext";
import { SubscriptionsContext } from "@/context/Subscriptions/SubscriptionsContext";

import CardProfileUser from "@/components/cards/cardProfileUser";
import UserInf from "@/components/cards/profileUserInf";
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
export default function ProfileUser() {
  const { UserRender } = useBoundStore((state) => state, shallow);
  const { ShowFollowerOrFollowingInfoPerfilUser } = useContext(FollowContext);
  const { SubscriptionPerfilUserData } = useContext(SubscriptionsContext);

  let banner_koolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg";
  let bannerUser = UserRender?.attributes?.userBanner
    ? UserRender.attributes.userBanner
    : banner_koolinart;

  useEffect(() => {
    async function fetchNft() {
      await ShowFollowerOrFollowingInfoPerfilUser();
      await SubscriptionPerfilUserData(UserRender?.attributes?.ethAddress);
    }
    fetchNft();
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
            height: { xs: "350px", md: "350px", lg: "350px", xl: "450px" },
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
            <CardProfileUser dataObjNft={UserRender} />
            <UserInf dataObjNft={UserRender} />
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
          <TabsGlobal titlesTabs="profileUser" />
        </Box>
      </Box>
    </Box>
  );
}
