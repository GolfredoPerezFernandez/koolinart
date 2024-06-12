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
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";

function StyledCardContainer() {
  return {
    backgroundColor: "secondary.icon",
    borderRadius: "50px",
    width: { xs: "250px", sm: "280px", md: "290px", lg: "300px", xl: "380px" },
    height: "fit-contents",
    p: "3.5px",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      p: "5px",
      mt: "-20px",
    },
  };
}
function StyledCardContent() {
  return {
    backgroundColor: "primary.main",
    width: "100%",
    height: "fit-content",
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
    width: { xs: "200px", sm: "210px", md: "240px", lg: "250px", xl: "300px" },
    height: { xs: "150px", sm: "180px", md: "190px", lg: "190px", xl: "210px" },
    borderRadius: "45px",
  };
}
function StyledContainerData() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  };
}

export default function CardProfileCollection(props) {
  const [errorCount, setErrorCount] = useState(0);

  let icono_user_basic =
    "https://ipfs.moralis.io:2053/ipfs/Qmf2GBHscwr8VrwocA11ajDTjHZPPEvC3VvWjeaMJVobRq/0xE568887Bf75AeA78147730CC4101aDf09626759E/icono_user_basic.svg";
  let navigate = useNavigate();
  let dataObjNft = props.dataObjNft?.attributes
    ? props.dataObjNft.attributes
    : props.dataObjNft;
  const AvatarUser = dataObjNft?.filePath
    ? dataObjNft?.filePath
    : icono_user_basic;
  const nameUser = dataObjNft?.name ? dataObjNft?.name : "Set you username";
  const description = dataObjNft?.description
    ? dataObjNft?.description
    : "Set you username";

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
      <CardContent sx={StyledCardContent}>
        <Box
          sx={{
            p: { xs: "15px", xl: "20px" },
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          {AvatarUser ? (
            <CardMedia
              onClick={() => {
                navigate(`/profile-nft/${collectionAddress}/${tokenId}`);
              }}
              sx={StyledCardMedia}
              component="img"
              image={AvatarUser}
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
              <Ghost_koolinart sx={{ backgroundColor: "red" }} />
            </Box>
          )}
          <Box sx={StyledContainerData}>
            {nameUser ? (
              <Tooltip title={nameUser} followCursor>
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
                  {nameUser.slice(0, 14)}
                </Typography>
              </Tooltip>
            ) : (
              <SkeletonTitle />
            )}
            {description ? (
              <Tooltip title={description} followCursor>
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
                  {description.slice(0, 90)}
                </Typography>
              </Tooltip>
            ) : (
              <SkeletonTitle />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}