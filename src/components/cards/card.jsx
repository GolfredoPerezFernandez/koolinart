import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import SkeletonAvatarCard from "@/components/Skeleton/skeletonAvatarCard";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

function StyledCardContainer(type) {
  let valueStyled;
  let typeBorder;
  switch (type) {
    case "CommonEggs":
      valueStyled = "backgroundColor";
      typeBorder = "secondary.icon";
      break;
    case "UncommonEggs":
      valueStyled = "background";
      typeBorder = "#1e50bd";
      break;
    case "RareEggs":
      valueStyled = "background";
      typeBorder = "#e022ad";
      break;
    case "LegendaryEggs":
      valueStyled = "background";
      typeBorder = "#ffd900";
      break;
    case "EasterEgg":
      valueStyled = "background";
      typeBorder =
        "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)";
      break;
    default:
      valueStyled = "backgroundColor";
      typeBorder = "secondary.icon";
      break;
  }
  return {
    [valueStyled]: typeBorder,
    borderRadius: "50px",
    width: { xs: "230px", sm: "250px", md: "240px", lg: "260px", xl: "290px" },
    height: { xs: "440px", sm: "450px", md: "450px", lg: "450px", xl: "480px" },
    p: "3.5px",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      p: "5px",
      mt: "-20px",
      animation: type == "EasterEgg" ? "spin 0.7s infinite linear" : null,
    },
    "@keyframes spin": {
      "0%": {
        background:
          "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
      },
      "14%": {
        background:
          "conic-gradient(#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c)",
      },
      "28%": {
        background:
          "conic-gradient(#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000)",
      },
      "42%": {
        background:
          "conic-gradient(#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020)",
      },
      "56%": {
        background:
          "conic-gradient(#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b)",
      },
      "70%": {
        background:
          "conic-gradient(#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff)",
      },
      "84%": {
        background:
          "conic-gradient(#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7)",
      },
      "100%": {
        background:
          "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
      },
    },
  };
}
function StyledCardContent() {
  return {
    backgroundColor: "primary.main",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "45px",
  };
}
function StyledCardMedia() {
  return {
    display: "flex",
    width: { xs: "190px", sm: "210px", md: "210px", lg: "210px", xl: "230px" },
    height: { xs: "200px", sm: "210px", md: "210px", lg: "190px", xl: "210px" },
    borderRadius: "45px",
  };
}
function StyledContainerAvatar() {
  return { display: "flex", justifyContent: "center", alignItems: "center" };
}
function StyledContainerCardMediaAvatar() {
  return {
    width: "55px",
    height: "56px",
    borderRadius: "15px",
    objectFit: "cover",
    marginRight: { xs: "12px", xl: "5px" },
    boxShadow:
      "0px 1px 1px rgb(0 0 0 / 1%), 0px 1px 33.4221px rgb(0 0 0 / 12%), 0px 21.3363px 17.869px rgb(0 0 0 / 10%), 0px 12.5216px 10.0172px rgb(0 0 0 / 1%), 0px 6.6501px 5.32008px rgb(0 0 0 / 6%), 0px 2.76726px 2.21381px rgb(0 0 0 / 14%)",
  };
}
function StyledContainerDataTypography() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };
}
function StyledContainerData() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px",
  };
}
function StyledDivider() {
  return {
    borderColor: "secondary.icon",
    borderWidth: "1.5px",
  };
}
export default function CardNft(props) {
  const [errorCount, setErrorCount] = useState(0);
  const { ThemeModeState } = useBoundStore((state) => state, shallow);
  let navigate = useNavigate();
  let dataObjNft = props.dataObjNft;
  let icono_user_basic =
    "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  const tokenId = dataObjNft?.tokenId ?? dataObjNft?.tokenIdAdmin ?? 0;
  const collectionAddress = dataObjNft?.collectionAddress
    ? dataObjNft?.collectionAddress
    : "";
  const type = dataObjNft?.type ? dataObjNft.type : "";
  const nameNft = dataObjNft?.name ? dataObjNft.name : "My name";
  const imageIdentification = dataObjNft?.imageIdentification
    ? dataObjNft.imageIdentification
    : "";
  const idUser = dataObjNft?.ownerAddress ? dataObjNft.ownerAddress : "";
  const usernameRender = dataObjNft?.username
    ? dataObjNft?.username
    : "Not username set";
  const userAvatarRender = dataObjNft?.userAvatar
    ? dataObjNft?.userAvatar
    : icono_user_basic;
  const minimumBid = dataObjNft?.minimumBid ? dataObjNft?.minimumBid : 0;
  const price = dataObjNft?.buyNowPrice ? dataObjNft?.buyNowPrice : 0;

  const handleError = (event) => {
    // Incrementa el contador de errores
    setErrorCount(errorCount + 1);

    // Verifica si el contador de errores ha alcanzado el límite
    if (errorCount < 3) {
      // Intenta cargar la imagen nuevamente
      setTimeout(() => {
        event.target.src = event.target.src;
      }, 2000); // Retry after 2000 seconds
    }
  };

  return (
    <Card sx={StyledCardContainer(type)}>
      <CardContent sx={StyledCardContent}>
        {imageIdentification ? (
          <CardMedia
            onClick={() => {
              navigate(`/profile-nft/${collectionAddress}/${tokenId}`);
            }}
            sx={StyledCardMedia}
            component="img"
            image={imageIdentification}
            alt="Image NFT"
            onError={handleError}
          />
        ) : (
          <Box
            sx={StyledCardMedia}
            onClick={() => {
              navigate(`/profile-nft/${collectionAddress}/${tokenId}`);
            }}
          >
            <CardMedia
              component="img"
              src={ghost_koolinart}
              sx={{ objectFit: "contain" }}
            />
          </Box>
        )}
        <Box sx={StyledContainerData}>
          {nameNft ? (
            <Tooltip title={nameNft} followCursor>
              <Typography
                variant="cardNftName"
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {nameNft.slice(0, 14)}
              </Typography>
            </Tooltip>
          ) : (
            <SkeletonTitle />
          )}

          <Box sx={StyledContainerAvatar}>
            {userAvatarRender ? (
              <CardMedia
                onClick={() => {
                  navigate(`/profile-artist/${idUser}`);
                }}
                component="img"
                image={
                  userAvatarRender == icono_user_basic
                    ? icono_user_basic
                    : userAvatarRender
                }
                sx={StyledContainerCardMediaAvatar}
                alt="Loading"
              />
            ) : (
              <SkeletonAvatarCard />
            )}

            {usernameRender ? (
              <Tooltip title={usernameRender} followCursor>
                <Typography
                  variant="cardNftUserName"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "text.secondary",
                    cursor: "pointer",
                  }}
                >
                  {usernameRender.slice(0, 10)}
                </Typography>
              </Tooltip>
            ) : (
              <SkeletonTitle />
            )}
          </Box>
          <Divider sx={StyledDivider} />
          <Box>
            <Box sx={StyledContainerDataTypography}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                Min bid:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {`${minimumBid} KNRT`}
              </Typography>
            </Box>
            <Box sx={StyledContainerDataTypography}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                Buy now:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {`${price} KNRT`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
