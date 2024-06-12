import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ButtonFollows from "@/components/buttons/buttonFollow";

function StyledCard() {
  return {
    width: "100%",
    height: { xs: "90px", sm: "100px", md: "", lg: "140px", xl: "" },
    p: { xs: "10px", md: "10px 20px" },
    display: "flex",
  };
}
function StyledCardMedia() {
  return {
    borderRadius: "20px",
    objectFit: "cover",
    cursor: "pointer",
    width: { xs: "50px", sm: "100px", md: "", lg: "120px", xl: "" },
    height: { xs: "50px", sm: "100px", md: "", lg: "100px", xl: "" },
  };
}
function StyledContainer() {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  };
}

export default function CardFollowersFollowings(props) {
  const [errorCount, setErrorCount] = useState(0);
  const navigate = useNavigate();
  const ethAddress = props?.info?.ethAddressUser
    ? props.info.ethAddressUser
    : "";
  const theFollower = props?.info?.count ? props.info.count : "0";
  const userName = props?.info?.username ? props.info.username : "No found";
  const userAvatar = props.info?.userAvatar
    ? props.info.userAvatar
    : "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
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
    <Card sx={StyledCard}>
      <CardContent sx={StyledContainer}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "10px", md: "20px" },
          }}
        >
          <CardMedia
            onClick={() => {
              navigate(`/profile-artist/${ethAddress}`);
            }}
            sx={StyledCardMedia}
            component="img"
            image={userAvatar}
            alt="Image avatar"
            onError={handleError}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Tooltip title={theFollower} followCursor>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", cursor: "pointer" }}
              >{`${theFollower} followers`}</Typography>
            </Tooltip>
            <Tooltip title={userName} followCursor>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", cursor: "pointer" }}
              >
                {`@${userName?.slice(0, 7)}`}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <ButtonFollows followings={ethAddress} />
      </CardContent>
    </Card>
  );
}
