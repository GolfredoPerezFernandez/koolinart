import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardActivity from "@/components/cards/card-activity";
import { Link, NavLink } from "react-router-dom";
import CheckFilter from "@components/check-filter";
const Top = () => {
  return (
    <Box
      sx={{
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16151A",
      }}
      mx="auto"
    >
      <Stack
        direction="row"
        sx={{
          my: { xs: 2, sm: 3, md: 3, lg: 3 },
        }}
      >
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#838990",
              fontSize: 15,
              marginLeft: 2,
            }}
          >
            Home /
          </Typography>
        </NavLink>
        <NavLink
          to="/activity"
          style={{
            textDecoration: "none",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "#838990",
              fontSize: 15,
              marginLeft: 2,
            }}
          >
            How It Works
          </Typography>
        </NavLink>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          my: { xs: 2, sm: 3, md: 3, lg: 3 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "#FFFFFF",
            alignSelf: "center",
            fontSize: { xs: 22, sm: 26, md: 32, lg: 38, xl: 44 },
            marginLeft: 2.5,
          }}
        >
          How It Works
        </Typography>
      </Stack>
    </Box>
  );
};

function Title(props: any) {
  return (
    <Typography
      sx={{
        fontFamily: "Poppins600SemiBold",
        color: "#fff",
        marginBottom: 2,
        fontSize: 22,
      }}
    >
      {props.children}
    </Typography>
  );
}

function Paragraph(props: any) {
  return (
    <Typography
      sx={{
        fontFamily: "Poppins400Regular",
        color: "#A1A1A1",
        fontSize: 16,
      }}
    >
      {props.children}
    </Typography>
  );
}

const Content = () => {
  return (
    <Stack sx={{ backgroundColor: "#16151A" }} my={8}>
      <Stack
        sx={{
          justifyContent: "center",
        }}
      >
        <Stack sx={{ maxWidth: "80%" }} mx={"auto"}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ maxWidth: 1400 }}
          >
            <Grid item mb={5} xs={6}>
              <Title> Lorem Ipsum </Title>
              <Paragraph>
                Digital marketplace for crypto collectibles and non-fungible
                tokens (NFTS). Buy, sell, and discover exclusive digital assets.
              </Paragraph>
            </Grid>
            <Grid item mb={5} xs={6}>
              <Title> Lorem Ipsum </Title>
              <Paragraph>
                Digital marketplace for crypto collectibles and non-fungible
                tokens (NFTS). Buy, sell, and discover exclusive digital assets.
              </Paragraph>
            </Grid>
            <Grid item mb={5} xs={6}>
              <Title> Lorem Ipsum </Title>
              <Paragraph>
                Digital marketplace for crypto collectibles and non-fungible
                tokens (NFTS). Buy, sell, and discover exclusive digital assets.
              </Paragraph>
            </Grid>
            <Grid item mb={5} xs={6}>
              <Title> Lorem Ipsum </Title>
              <Paragraph>
                Digital marketplace for crypto collectibles and non-fungible
                tokens (NFTS). Buy, sell, and discover exclusive digital assets.
              </Paragraph>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function HowItWorks() {
  return (
    <Box sx={{ backgroundColor: "#16151A" }}>
      <Top />
      <Content />
    </Box>
  );
}
