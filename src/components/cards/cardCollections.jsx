import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import useModalStore from "@/store/userModalStore";

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
    borderRadius: { xs: "30px", sm: "45px" },
    width: { xs: "235px", sm: "300px", md: "370px", lg: "370px", xl: "390px" },
    height: { xs: "250px", sm: "300px", md: "350px", lg: "350px", xl: "390px" },
    p: "3.5px",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      p: "5px",
      m: "-20px",
      animation: type == "EasterEgg" ? "spin 0.5s infinite linear" : null,
    },
    // "@keyframes spin": {
    //   "0%": {
    //     background:
    //       "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
    //   },
    //   "14%": {
    //     background:
    //       "conic-gradient(#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c)",
    //   },
    //   "28%": {
    //     background:
    //       "conic-gradient(#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000)",
    //   },
    //   "42%": {
    //     background:
    //       "conic-gradient(#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020)",
    //   },
    //   "56%": {
    //     background:
    //       "conic-gradient(#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b)",
    //   },
    //   "70%": {
    //     background:
    //       "conic-gradient(#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff)",
    //   },
    //   "84%": {
    //     background:
    //       "conic-gradient(#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7)",
    //   },
    //   "100%": {
    //     background:
    //       "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
    //   },
    // },
    "@keyframes spin": {
      "0%": {
        background: "#fd004c",
      },
      "14%": {
        background: "#fe9000",
      },
      "28%": {
        background: "#fff020",
      },
      "42%": {
        background: "#3edf4b",
      },
      "56%": {
        background: "#3363ff",
      },
      "70%": {
        background: "#b102b7",
      },
      "84%": {
        background: "#fd004c",
      },
      "100%": {
        background: "#fd004c",
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
    borderRadius: { xs: "25px", sm: "40px" },
  };
}
function StyledContainerCardMedia() {
  return {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    mb: { xs: "20px", md: "40px" },
  };
}
function StyledCardMedia() {
  return {
    display: "flex",
    width: { xs: "190px", sm: "250px", md: "300px", lg: "320px", xl: "340px" },
    height: { xs: "100px", sm: "120px", md: "135px", lg: "140px", xl: "160px" },
    borderRadius: { xs: "20px", sm: "40px" },
  };
}
function StyledCardMediaAvatar() {
  return {
    width: { xs: "55px", sm: "65px", md: "75px" },
    height: { xs: "55px", sm: "65px", md: "70px" },
    cursor: "pointer",
    borderRadius: "10px",
    objectFit: "cover",
    position: "absolute",
    bottom: "-20%",
    boxShadow:
      "0px 100px 80px rgba(0, 0, 0, 0.06), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.04), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}
function StyledContainerData() {
  return {
    display: "flex",
    width: { xs: "190px", sm: "210px", md: "210px", lg: "320px", xl: "230px" },
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "15px",
  };
}
function StyledDataTypography() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
}

export default function CardCollections(props) {
  const [errorCount, setErrorCount] = useState(0);
  let navigate = useNavigate();
  const { setStateModalGlobal } = useModalStore();
  const { ThemeModeState } = useBoundStore((state) => state, shallow);
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";
  const banner_koolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg";
  const icono_user_basic =
    "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
  let dataObjNft = props.dataObjNft;
  const type = dataObjNft?.metadataNft?.type ? dataObjNft.metadataNft.type : "";
  const floorPrice = dataObjNft?.floorPrice ? dataObjNft.floorPrice : "0";
  const volumen = dataObjNft?.volumenCollection
    ? dataObjNft.volumenCollection
    : "0";
  const nameCollection = dataObjNft?.name ? dataObjNft.name : "Nombre random ";
  const filePath = dataObjNft?.filePath
    ? dataObjNft.filePath
    : banner_koolinart;
  const userAvatar = dataObjNft?.userAvatar
    ? dataObjNft.userAvatar
    : icono_user_basic;
  const idUser = dataObjNft?.owner ? dataObjNft.owner : "";
  const collect = dataObjNft?.collectionAddress
    ? dataObjNft.collectionAddress
    : "";

  const userNameModalGlobal = () => {
    const open = true;
    const title = "Name";
    const message = nameCollection;
    setStateModalGlobal(open, title, message);
  };
  const handleImageLoad = (event) => {
    const image = event.target;
    const container = image.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // Calculate the aspect ratio of the image

    const aspectRatio = imageWidth / imageHeight;

    // Calculate the aspect ratio of the container
    const containerAspectRatio = containerWidth / containerHeight;

    // Decide the value of objectFit based on aspect ratios
    const objectFit = aspectRatio > containerAspectRatio ? "cover" : "unset";

    // Applies the objectFit value to the image style
    image.style.objectFit = objectFit;
  };
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
        <Box sx={StyledContainerCardMedia}>
          {filePath ? (
            <CardMedia
              onClick={() => {
                navigate(`/profile-colletion/${collect}`);
              }}
              sx={StyledCardMedia}
              component="img"
              image={filePath}
              alt="Image NFT"
              onLoad={handleImageLoad} // Llama a la función handleImageLoad cuando la imagen se carga
              onError={handleError}
            />
          ) : (
            <Box sx={StyledCardMedia}>
              <CardMedia component="img" src={ghost_koolinart} />
            </Box>
          )}
          {userAvatar ? (
            <CardMedia
              onClick={() => {
                navigate(`/profile-artist/${idUser}`);
              }}
              sx={StyledCardMediaAvatar}
              component="img"
              image={userAvatar}
              alt="Image NFT"
              onError={handleError}
            />
          ) : (
            <Box sx={StyledCardMediaAvatar}>
              <CardMedia component="img" src={ghost_koolinart} />
            </Box>
          )}
        </Box>
        {nameCollection ? (
          <Tooltip title={nameCollection} followCursor>
            <Typography
              variant="collectionCard"
              sx={{
                color: "text.secondary",
              }}
              onClick={() => userNameModalGlobal()}
            >
              {nameCollection.slice(0, 15)}
            </Typography>
          </Tooltip>
        ) : (
          <SkeletonTitle />
        )}
        <Box sx={StyledContainerData}>
          <Box sx={StyledDataTypography}>
            <Typography
              variant="collectionCardData"
              sx={{
                color: "text.secondary",
              }}
            >
              Floor Price
            </Typography>
            <Typography
              variant="collectionCardData"
              sx={{
                color: "text.secondary",
                fontWeight: "600",
              }}
            >
              {floorPrice ? floorPrice : <SkeletonTitle />} KNRT
            </Typography>
          </Box>
          <Box sx={StyledDataTypography}>
            <Typography
              variant="collectionCardData"
              sx={{
                color: "text.secondary",
              }}
            >
              volumen
            </Typography>
            <Typography
              variant="collectionCardData"
              sx={{
                color: "text.secondary",
                fontWeight: "600",
              }}
            >
              {volumen ? volumen : <SkeletonTitle />} KNRT
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="collectionCardData"
          sx={{
            color: "text.secondary",
            fontWeight: "600",
          }}
        >
          ERC-721
        </Typography>
      </CardContent>
    </Card>
  );
}
