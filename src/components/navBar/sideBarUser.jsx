import { useState, useContext } from "react";
import { shallow } from "zustand/shallow";
import { useBoundStore } from "@/store/index";
import { UserContext } from "@/context/User/UserContext";
import {
  ArrowForwardIosRounded,
  AttachMoney,
  ContentCopyOutlined,
  Logout,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import copy from "copy-to-clipboard";
import ModalBuyToken from "@/components/modals/modalBuyToken";
import ItemsNav from "@/components/navBar/itemsNav";

function StyledCardAvatar() {
  return {
    backgroundColor: "common.two",
    border: "2px solid",
    borderColor: "common.two",
    borderRadius: "15px",
    width: { xs: "35px", sm: "45px", lg: "50px", xl: "55px" },
    height: { xs: "35px", sm: "45px", lg: "50px", xl: "55px" },
    cursor: "pointer",
  };
}
function StyledAvatar() {
  return {
    objectFit: "cover",
    height: "inherit",
  };
}
function StyledDrawer() {
  return {
    width: 0,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: {
        xs: "250px",
        sm: "290px",
        md: "320px",
        lg: "350px",
        xl: "420px",
      },
      height: "fit-content",
      my: "15px",
      mx: { xs: "10px", sm: "20px" },
      p: "20px",
      borderRadius: "15px",
    },
  };
}
function StyledDivider() {
  return {
    height: "1  px",
    backgroundColor: "common.two",
  };
}
function StyledTypography() {
  return {
    color: "text.secondary",
    cursor: "default",
  };
}
function StyledCardContainer(margin) {
  return {
    my: margin ? "25px" : "0px",
    p: { xs: "12px", sm: "15px", md: "20px" },
    border: "2px solid",
    borderColor: "secondary.icon",
    borderRadius: "15px",
    boxShadow: "unset",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
}
function StyledContainerData() {
  return {
    display: "flex",
  };
}
function StyledCardMediaImgData() {
  return {
    width: "30px",
    height: "20px",
    objectFit: "contain",
    px: "3px",
    cursor: "pointer",
    color: "secondary.icon",
    transition: "0.3s",
    ":hover": {
      color: "secondary.main",
    },
  };
}

export default function SideBarUser() {
  const [open, setOpen] = useState(false);
  const { LogoutFunc } = useContext(UserContext);
  const {
    UserRender,
    AmountKnrtUser,
    MaticBalance,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
  } = useBoundStore((state) => state, shallow);
  let fox =
    "https://ipfs.moralis.io:2053/ipfs/QmSeK9V1uMkqN44AwpJdGQAddnqBQ1Lb7GNqGDtU9XXPU5/0xE568887Bf75AeA78147730CC4101aDf09626759E/metamask.svg";
  let matic =
    "https://ipfs.moralis.io:2053/ipfs/QmfA199t9GRga69GwwAMfNYRUbLVCsjz3ESyiwVULyDV4i/0xE568887Bf75AeA78147730CC4101aDf09626759E/polygon_matic_logo.svg";
  let token_knrt =
    "https://ipfs.moralis.io:2053/ipfs/QmNx9ZtNnzAoHFWpBVXX7ow2W75Jm5bSNUu1rL67YE222W/0xE568887Bf75AeA78147730CC4101aDf09626759E/token_knrt.svg";
  const ethAddress = UserRender.attributes?.ethAddress
    ? UserRender.attributes?.ethAddress
    : "";
  const avatarUser = UserRender.attributes?.userAvatar
    ? UserRender.attributes?.userAvatar
    : "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
  const userName = UserRender.attributes?.username
    ? UserRender.attributes?.username.substring(0, 15)
    : "";
  const balanceKNRT = AmountKnrtUser ? AmountKnrtUser : 0;
  const balanceMatic = MaticBalance ? MaticBalance : 0;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function ItemLogout(props) {
    let navigate = useNavigate();

    return (
      <Box
        display="flex"
        alignItems="center"
        mx="5px"
        onClick={() => {
          LogoutFunc(), navigate(`/`);
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "text.primary",
              fontWeight: "500",
            },
          }}
        >
          {props.children}
        </Typography>
        <Logout sx={StyledCardMediaImgData()} />
      </Box>
    );
  }

  function handleCopyEthAdrress() {
    copy(ethAddress, {
      debug: true,
      message: `ethAddress ${ethAddress} copy to clipboard`,
    });
    ChangeTypeAlert(`success`);
    ChangeTitleAlert(`success in copy Address`);
    ChangeStateAlert(true);
  }
  return (
    <>
      <Card sx={StyledCardAvatar}>
        <CardMedia
          component="img"
          image={avatarUser}
          alt="User Avatar"
          sx={StyledAvatar}
          onClick={() => handleDrawerOpen()}
        />
      </Card>
      <Drawer
        sx={StyledDrawer}
        variant="persistent"
        anchor="right"
        open={open}
        onClick={handleDrawerClose}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Card sx={StyledCardAvatar}>
                <CardMedia
                  component="img"
                  image={avatarUser}
                  alt="User Avatar"
                  sx={StyledAvatar}
                  onClick={handleDrawerOpen}
                />
              </Card>
              <Typography sx={StyledTypography} variant="subtitle2">
                @{userName}
              </Typography>
            </Box>
            <ArrowForwardIosRounded
              onClick={() => handleDrawerClose()}
              sx={StyledCardMediaImgData}
            />
          </Box>
          <Divider sx={StyledDivider} />
          <ItemsNav to="/user">Profile</ItemsNav>
          <ItemsNav to="/create-nft">Create Nfts</ItemsNav>
          <ItemsNav to="/user">Settings</ItemsNav>
          <ItemLogout>Logout</ItemLogout>
          <Box sx={StyledCardContainer(true)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "10px", md: "20px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={fox}
                    alt="Logo Metamask"
                    sx={{
                      width: { xs: "25px", sm: "30px", lg: "35px" },
                      objectFit: "contain",
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={StyledTypography}>
                      Wallet
                    </Typography>
                    <Typography variant="subtitle2" sx={StyledTypography}>
                      {ethAddress.slice(0, 6)}...{ethAddress.slice(-4)}
                    </Typography>
                  </Box>
                </Box>
                <ContentCopyOutlined
                  fontSize="medium"
                  sx={StyledCardMediaImgData()}
                  onClick={handleCopyEthAdrress}
                />
              </Box>
              <Box sx={StyledCardContainer(false)}>
                <Box sx={StyledContainerData}>
                  <AttachMoney sx={StyledCardMediaImgData()} />
                  <Typography variant="subtitle2" sx={StyledTypography}>
                    {balanceKNRT.toString().slice(0, 8)} {"KNRT"}
                  </Typography>
                </Box>
                <Box sx={StyledContainerData}>
                  <CardMedia
                    component="img"
                    image={token_knrt}
                    alt="token_knrt"
                    sx={StyledCardMediaImgData()}
                  />
                  <Typography variant="subtitle2" sx={StyledTypography}>
                    {balanceKNRT.toString().slice(0, 8)} {"KNRT"}
                  </Typography>
                </Box>
                <Box sx={StyledContainerData}>
                  <CardMedia
                    component="img"
                    image={matic}
                    alt="Matic"
                    sx={StyledCardMediaImgData()}
                  />
                  <Typography variant="subtitle2" sx={StyledTypography}>
                    {balanceMatic.toString().slice(0, 8)} {"MATIC"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <ModalBuyToken />
        </Box>
      </Drawer>
    </>
  );
}
