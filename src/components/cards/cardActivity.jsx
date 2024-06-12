import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkeletonCardMediaActivity from "@/components/Skeleton/skeletonCardMediaActivity";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function StyledCardContainer() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: { xs: "15px", sm: "20px" },
    width: {
      xs: "250px",
      sm: "290px",
      md: "320px",
      lg: "400px",
      xl: "450px",
    },
    height: {
      xs: "220px",
      sm: "240px",
      md: "260px",
      lg: "280px",
      xl: "320px",
    },
    backgroundColor: "primary.main",
    borderRadius: "40px",
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
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  };
}
function StyledCardMedia() {
  return {
    borderRadius: { xs: "20px", sm: "30px" },
    cursor: "pointer",
    objectFit: "cover",
    width: { xs: "100px", sm: "110px", md: "130px", lg: "150px", xl: "180px" },
    height: { xs: "160px", sm: "190px", md: "200px", lg: "240px", xl: "280px" },
  };
}
function StyledData() {
  return {
    display: "flex",
    flexDirection: "column",
    width: { xs: "110px", md: "120px", lg: "200px", xl: "220px" },
    height: "100%",
    justifyContent: "space-around",
    p: { xs: "5px", lg: "20px", xl: "30px" },
  };
}
function StyledDataTypography(opacity) {
  return {
    color: "text.secondary",
    opacity: opacity ? "0.9" : 1,
    textAlign: "center",
  };
}
function StyledDivider() {
  return {
    borderColor: "secondary.icon",
    borderWidth: "1.5px",
  };
}
export default function CardActivity(props) {
  let navigate = useNavigate();
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const imageIdentification = props.data?.metadataNft?.imageIdentification
    ? props.data.metadataNft.imageIdentification
    : "";
  const nameNft = props.data?.metadataNft?.name
    ? props.data.metadataNft.name
    : null;
  const usernameRender = props.data?.username ? props.data?.username : "";
  const date = props.data?.createdAt ? new Date(props.data.createdAt) : null;
  const dateAgo = date ? timeAgo.format(new Date(date)) : null;
  const price = props.data?.buyNowPrice ? props.data.buyNowPrice : "0";
  const minimumBid = props.data?.minimumBid ? props.data.minimumBid : "0";
  const tokenId = props.data?.tokenId ? props.data.tokenId : "";
  const collectionAddress = props.data?.collectionAddress
    ? props.data.collectionAddress
    : "";

  let typeHistory = props.data?.stateOfHistory
    ? props.data.stateOfHistory
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
            onClick={() => {
              navigate(`/profile-nft/${collectionAddress}/${tokenId}`);
            }}
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
              <Typography variant="nameNft" sx={StyledDataTypography(true)}>
                {typeHistory}
              </Typography>
            </Tooltip>
          ) : (
            <SkeletonTitle width={"100%"} />
          )}
          <Divider sx={StyledDivider} />

          <Typography
            variant="collectionCardData"
            sx={StyledDataTypography(false)}
          >
            {dateAgo ? dateAgo : <SkeletonTitle width={"100%"} />}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
