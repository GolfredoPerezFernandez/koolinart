import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import SkeletonCardMediaActivity from "@/components/Skeleton/skeletonCardMediaActivity";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function StyledCardContainer() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: { xs: "10px", sm: "20px" },
    width: {
      xs: "225px",
      sm: "300px",
      md: "380px",
      lg: "460px",
      xl: "500px",
    },
    height: {
      xs: "160px",
      sm: "180px",
      md: "200px",
      lg: "215px",
      xl: "250px",
    },
    backgroundColor: "primary.main",
    borderRadius: "20px",
    transition: "0.6s",
    cursor: "pointer",
    "&:hover": {
      outline: "3px solid #C02327",
      mt: "-10px",
    },
  };
}
function StyledCardContent() {
  return {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  };
}
function StyledCardMedia() {
  return {
    borderRadius: "30px",
    cursor: "pointer",
    objectFit: "cover",
    width: { xs: "90px", sm: "130px", md: "160px", lg: "190px", xl: "210px" },
    height: { xs: "85px", sm: "120px", md: "140px", lg: "170px", xl: "180px" },
  };
}
function StyledData() {
  return {
    display: "flex",
    flexDirection: "column",
    width: { xs: "110px", sm: "120px", md: "140px", lg: "200px", xl: "220px" },
    justifyContent: "space-around",
    gap: { xs: "5px", sm: "10px" },
  };
}
function StyledDataTypography(opacity) {
  return {
    color: "text.secondary",
    opacity: opacity ? "0.8" : 1,
    textAlign: "center",
  };
}
export default function CardActivityPerfilNft(props) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const imageIdentification = props.dataObjNft?.metadataNft?.imageIdentification
    ? props.dataObjNft.metadataNft.imageIdentification
    : "";
  const nameNft = props.dataObjNft?.metadataNft?.name
    ? props.dataObjNft.metadataNft.name
    : null;
  const usernameRender = props.dataObjNft?.username
    ? props.dataObjNft?.username
    : "";
  const date = props.dataObjNft?.createdAt
    ? new Date(props.dataObjNft.createdAt)
    : null;
  const dateAgo = date ? timeAgo.format(new Date(date)) : null;
  const price = props.dataObjNft?.buyNowPrice
    ? props.dataObjNft.buyNowPrice
    : "0";
  const minimumBid = props.dataObjNft?.minimumBid
    ? props.dataObjNft.minimumBid
    : "0";

  let typeHistory = props.dataObjNft?.stateOfHistory
    ? props.dataObjNft.stateOfHistory
    : null;

  switch (typeHistory) {
    case "createNft":
      typeHistory = `CREATED NFT by @${usernameRender.slice(
        0,
        7
      )} for price ${price} KNRT `;
      if (minimumBid != "0") {
        typeHistory += `and for minimum bid ${minimumBid} KNRT`;
      }
      break;
    case "purchased":
      typeHistory = `PURCHASED NFT by @${usernameRender.slice(
        0,
        7
      )}  for ${price} KNRT`;
      break;
    case "re-sold":
      typeHistory = `RESOLD NFT by @${usernameRender.slice(
        0,
        7
      )}  for ${price} KNRT`;
      break;
    case "createHighestBid":
      typeHistory = `AUCTIONED by @${usernameRender.slice(
        0,
        7
      )}  for ${price} KNRT`;
      break;
    case "re-auctioned":
      typeHistory = `RE-AUCTIONED by  @${usernameRender.slice(
        0,
        7
      )}  for ${price} KNRT`;
      break;
    case "removed":
      typeHistory = `REMOVED NFT by @${usernameRender.slice(0, 7)}`;
      break;
    default:
      typeHistory = "";
      break;
  }
  return (
    <Card sx={StyledCardContainer}>
      <CardContent sx={StyledCardContent}>
        {imageIdentification ? (
          <CardMedia
            sx={StyledCardMedia}
            component="img"
            image={imageIdentification}
            alt="Image NFT"
          />
        ) : (
          <SkeletonCardMediaActivity />
        )}
        <Box sx={StyledData}>
          {nameNft ? (
            <Tooltip title={nameNft} followCursor>
              <Typography variant="subtitle2" sx={StyledDataTypography(false)}>
                {nameNft.slice(0, 12)}
              </Typography>
            </Tooltip>
          ) : (
            <SkeletonTitle width={"100%"} />
          )}
          {typeHistory ? (
            <Tooltip title={usernameRender} followCursor>
              <Typography variant="subtitle2" sx={StyledDataTypography(true)}>
                {typeHistory}
              </Typography>
            </Tooltip>
          ) : (
            <SkeletonTitle width={"100%"} />
          )}
          <Typography variant="subtitle2" sx={StyledDataTypography(false)}>
            {dateAgo ? dateAgo : <SkeletonTitle width={"100%"} />}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
