import React from "react";
import { Box, CardMedia, Divider, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
function StyledDivider() {
  return {
    height: "1px",
    backgroundColor: "common.white",
  };
}
function StyledTypographyItems() {
  return {
    color: "common.white",
    fontWeight: "600",
    textAlign: "center",
    cursor: "default",
  };
}
function StyledTypographyItemsToNavigation() {
  return {
    color: "common.white",
    fontWeight: "600",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.4s",
    "&:hover": {
      fontWeight: "700",
      color: "common.black",
    },
  };
}
function StyledTypographyTitle() {
  return {
    color: "common.white",
    cursor: "default",
    my: "15px",
    textAlign: "center",
  };
}
function StyledTypographyOther() {
  return {
    color: "common.white",
    fontWeight: "300",
    textAlign: "center",
  };
}
export default function Footer() {
  let imagotipokoolinartwhite =
    "https://ipfs.moralis.io:2053/ipfs/Qmeezsb8kC7qq7YAhzzNxW4yU7r5aWCGoDHwzRG3cFH9Tq/0xE568887Bf75AeA78147730CC4101aDf09626759E/imagotipo_koolinart_v2.svg";
  let navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#C02327" }}>
      <Box
        sx={{
          mx: { xs: "10px", sm: "10px", md: "24px", lg: "40px" },
          py: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: { xs: "center", sm: "start" },
            gap: { xs: "20px", sm: "30px", md: "90px", lg: "0px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CardMedia
              component="img"
              image={imagotipokoolinartwhite}
              alt="Image NFT"
              sx={{
                width: { xs: "45px", lg: "89px" },
                cursor: "default",
              }}
            />
            <Typography variant="h2" sx={StyledTypographyOther}>
              Impact & Purpose
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="subtitle1" sx={StyledTypographyTitle}>
              Marketplace
            </Typography>
            <Typography
              variant="subtitle2"
              sx={StyledTypographyItemsToNavigation}
              onClick={() => {
                navigate(`/create-nft`);
              }}
            >
              Create
            </Typography>
            <Typography
              variant="subtitle2"
              sx={StyledTypographyItemsToNavigation}
              onClick={() => {
                navigate(`/explore`);
              }}
            >
              Explore
            </Typography>
            <Typography
              variant="subtitle2"
              sx={StyledTypographyItemsToNavigation}
              onClick={() => {
                navigate(`/activity`);
              }}
            >
              Activity
            </Typography>
            <Typography
              variant="subtitle2"
              sx={StyledTypographyItemsToNavigation}
              onClick={() => {
                navigate(`/HowItWorks`);
              }}
            >
              Hot it works
            </Typography>
            <Typography
              variant="subtitle2"
              sx={StyledTypographyItemsToNavigation}
              onClick={() => {
                navigate(`/privacy-and-terms`);
              }}
            >
              Privacy & terms
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="body2" sx={StyledTypographyTitle}>
              Join Newsletter
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              Sign Up to our
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              newsletter to get
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              the latest news
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              sent to you.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="body2" sx={StyledTypographyTitle}>
              Contact Us
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              please contact us if you have any specific ideas or requests{" "}
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              support@koolinart.com
            </Typography>
            <Typography variant="subtitle2" sx={StyledTypographyItems}>
              1032 E Brandon Blvd #7182, Brandon,FL 33511
            </Typography>
          </Box>
        </Box>
        <Divider sx={StyledDivider} />
        <Typography variant="subtitle2" sx={StyledTypographyOther}>
          Copyright © 2023 koolinart. All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
