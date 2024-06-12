import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";

const Top = () => {
  return (
    <Box
      sx={{
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          width: "inherit",
          mx: "auto",
        }}
      >
        <NavLink to="/">
          <ArrowBackIosIcon sx={{ color: "secondary.icon" }} />
        </NavLink>
        <Typography
          sx={{
            fontFamily: "Poppins",
            textAlign: "center",
            color: "#C02327",
            fontStyle: "normal",
            fontSize: "30px",
            fontWeight: "800",
            lineHeight: "68px",
          }}
        >
          Privacy And Terms
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
    <Stack
      sx={{
        width: "90%",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303030",
        color: "#C02327",
      }}
    >
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
export default function PrivacyAndTerms() {
  return (
    <Box pt={5} sx={{ backgroundColor: "#303030", color: "#C02327" }}>
      <Top />
      <Box py={5} width="90%" m="auto">
        <Divider
          sx={{
            margin: "auto",
            width: "inherit",
            height: "1px",
            backgroundColor: "#EAE8E8",
          }}
        />
      </Box>
      <Content />

      <Box py={5} width="90%" m="auto">
        <Divider
          sx={{
            margin: "auto",
            height: "1px",
            width: "inherit",
            backgroundColor: "#EAE8E8",
          }}
        />
      </Box>
    </Box>
  );
}
