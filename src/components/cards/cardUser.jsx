import { useState } from "react";
import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import ButtonFollows from "@/components/buttons/buttonFollow";

function StyledCardContainer() {
  return {
    width: { xs: "200px", sm: "200px", md: "250px", lg: "260px", xl: "290px" },
    height: { xs: "260px", sm: "280px", md: "320px", lg: "340px", xl: "380px" },
    borderRadius: { xs: "40px", sm: "50px" },
    p: "15px",
  };
}
function StyledContainerCardMedia() {
  return {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    mb: { xs: "30px", sm: "35px", md: "40px", lg: "40px", xl: "45px" },
  };
}
function StyledCardMedia() {
  return {
    display: "flex",
    width: { xs: "160px", sm: "170px", md: "220px", lg: "235px", xl: "240px" },
    height: { xs: "100px", sm: "110px", md: "135px", lg: "140px", xl: "160px" },
    borderRadius: { xs: "25px", sm: "35px" },
    boxShadow:
      "0px 100px 80px rgba(0, 0, 0, 0.06), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.04), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}
function StyledCardMediaAvatar() {
  return {
    width: { xs: "55px", sm: "65px", md: "75px" },
    height: { xs: "55px", sm: "65px", md: "70px" },
    cursor: "pointer",
    borderRadius: "15px",
    objectFit: "cover",
    position: "absolute",
    bottom: { xs: "-20%", sm: "-20%", md: "-20%", lg: "-20%", xl: "-20%" },
    boxShadow:
      "0px 100px 80px rgba(0, 0, 0, 0.06), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.04), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}
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
function StyledData() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: { xs: "10px", sm: "10px", md: "10px" },
  };
}

export default function CardUser(props) {
  let navigate = useNavigate();
  const [errorCount, setErrorCount] = useState(0);
  const { ThemeModeState } = useBoundStore((state) => state, shallow);
  let data = props.data;
  let icono_user_basic =
    "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
  const banner_koolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg";
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";
  const userAvatar = data?.userAvatar ? data?.userAvatar : icono_user_basic;
  const userBanner = data?.userBanner ? data?.userBanner : banner_koolinart;
  const username = data?.username ? data?.username : "";
  const ethAddress = data?.ethAddress ? data?.ethAddress : "";
  const theFollower = data?.count ? data?.count : 0;
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
    <Card sx={StyledCardContainer}>
      <CardContent>
        <Box sx={StyledContainerCardMedia}>
          {userBanner ? (
            <CardMedia
              onClick={() => {
                navigate(`/profile-artist/${ethAddress}`);
              }}
              sx={StyledCardMedia}
              component="img"
              image={userBanner}
              alt="Image NFT"
              onLoad={handleImageLoad}
              onError={handleError}
            />
          ) : (
            <Box sx={StyledCardMedia}>
              <CardMedia
                component="img"
                src={ghost_koolinart}
                sx={{ objectFit: "contain" }}
              />
            </Box>
          )}
          {userAvatar ? (
            <CardMedia
              onClick={() => {
                navigate(`/profile-artist/${ethAddress}`);
              }}
              sx={StyledCardMediaAvatar}
              component="img"
              image={userAvatar}
              alt="Image NFT"
              onError={handleError}
            />
          ) : (
            <Box sx={StyledCardMediaAvatar}>
              <CardMedia
                component="img"
                src={ghost_koolinart}
                sx={{ objectFit: "contain" }}
              />
            </Box>
          )}
        </Box>
        <Box sx={StyledData}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            @{username.slice(0, 15)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Follower {theFollower}
          </Typography>
          <ButtonFollows followings={ethAddress} />
        </Box>
      </CardContent>
    </Card>
  );
}
