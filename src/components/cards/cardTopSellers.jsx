import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import SkeletonTopSeller from "@/components/Skeleton/skeletonTopSeller";

function StyledCardContainerOne() {
  return {
    background: "#ffd900",
    borderRadius: "50px",
    width: { xs: "230px", sm: "250px", md: "200px", lg: "240px", xl: "290px" },
    height: { xs: "320px", sm: "340px", md: "320px", lg: "370px", xl: "450px" },
    p: "3.5px",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      p: "5px",
      mt: { xs: "-20px", md: "-20px" },
    },
  };
}
function StyledCardContainerTwo() {
  return {
    backgroundColor: "secondary.icon",
    borderRadius: { xs: "50px", md: "30px" },
    width: { xs: "230px", sm: "250px", md: "120px", lg: "130px", xl: "160px" },
    height: { xs: "320px", sm: "340px", md: "180px", lg: "190px", xl: "240px" },
    p: { xs: "3.5px", md: "3px" },
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      p: { xs: "5px", md: "4px" },

      mt: { xs: "-20px", md: "-10px" },
    },
  };
}
function StyledCardContent(Border) {
  let borderNew = Border
    ? { xs: "45px", sm: "45px", md: "45px", lg: "45px", xl: "45px" }
    : { xs: "45px", sm: "45px", md: "25px", lg: "25px", xl: "25px" };
  return {
    backgroundColor: "primary.main",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: borderNew,
  };
}
function StyledCardMedia() {
  return {
    display: "flex",
    width: {
      xs: "170px",
      sm: "190px",
      md: "150px",
      lg: "190px",
      xl: "220px",
    },
    height: {
      xs: "160px",
      sm: "180px",
      md: "150px",
      lg: "190px",
      xl: "200px",
    },
    borderRadius: { xs: "40px", md: "20px" },
  };
}
function StyledCardMediaTwo() {
  return {
    display: "flex",
    width: { xs: "170px", sm: "190px", md: "90px", lg: "90px", xl: "120px" },
    height: { xs: "160px", sm: "180px", md: "90px", lg: "85px", xl: "110px" },
    borderRadius: { xs: "40px", md: "20px" },
  };
}
function StyledContainerData() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };
}
function StyledDivider(typeCard) {
  let widthDivider = typeCard
    ? { xs: "170px", sm: "190px", md: "150px", lg: "190px", xl: "200px" }
    : { xs: "170px", sm: "190px", md: "90px", lg: "90px", xl: "120px" };

  return {
    borderColor: "secondary.icon",
    borderWidth: "1.5px",
    width: widthDivider,
  };
}

export default function CardTopSellers(props) {
  let navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  let ItemOne = props.itemOne;
  let icono_user_basic =
    "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";

  const userAvatar = props.dataObjNft.userAvatar
    ? props.dataObjNft.userAvatar
    : icono_user_basic;
  const username = props.dataObjNft.username
    ? props.dataObjNft.username
    : "user";
  const price = props.dataObjNft.TotalSoldInToken
    ? props.dataObjNft.TotalSoldInToken
    : "0";
  const idUser = props.dataObjNft?.ethAddress
    ? props.dataObjNft.ethAddress
    : "";

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
    <Card sx={ItemOne ? StyledCardContainerOne : StyledCardContainerTwo}>
      <CardContent sx={StyledCardContent(ItemOne)}>
        {userAvatar ? (
          <CardMedia
            onClick={() => {
              navigate(`/profile-artist/${idUser}`);
            }}
            sx={ItemOne ? StyledCardMedia : StyledCardMediaTwo}
            component="img"
            image={userAvatar}
            alt="top sellers image user"
            onError={handleError}
          />
        ) : (
          <SkeletonTopSeller />
        )}
        <Box sx={StyledContainerData}>
          {username ? (
            <Tooltip title={username} followCursor>
              <Typography
                variant={
                  ItemOne ? "topSellersUsernameTopOne" : "topSellersUsername"
                }
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontStyle: "normal",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => userNameModalGlobal()}
              >
                @{username.slice(0, 7)}
              </Typography>
            </Tooltip>
          ) : (
            <SkeletonTitle />
          )}
          <Divider sx={StyledDivider(ItemOne)} />
          {price ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant={ItemOne ? "topSellersPriceTopOne" : "topSellersPrice"}
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {`Total sold`}
                <br />
              </Typography>
              <Typography
                variant={ItemOne ? "topSellersPriceTopOne" : "topSellersPrice"}
                sx={{
                  fontWeight: "700",
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {`${price} KNRT`}
              </Typography>
            </Box>
          ) : (
            <SkeletonTitle />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
