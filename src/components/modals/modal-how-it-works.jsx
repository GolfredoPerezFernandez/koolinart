import ButtonPrimary from "@/components/buttons/button-primary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 240, sm: 300, md: 500 },
  bgcolor: "#414141",
  boxShadow: 20,
  borderRadius: "30px",
  py: { xs: 2, md: 4 },
  px: { xs: 2, md: 8 },
};

export default function ModalHowItWorks() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function FooterButton(props) {
    return (
      <Box
        sx={{
          textDecoration: "none",
          color: "#FFFFFF",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
                textAlign: "center",
                color: "#FFFFFF",
                fontStyle: "normal",
                fontSize: { xs: 14, sm: 18, md: 20, lg: 22, xl: 24 },
                fontWeight: "400",
                lineHeight: "30px",
                margin: props.margin,
                justifyContent: "center",
                whiteSpace: "break-spaces",
                transition: "1s",
                cursor:"pointer",
                "&:hover": {
                  fontSize: {
                    xs: 15,
                    sm: 19,
                    md: 21,
                    lg: 23,
                    xl: 25,
                  },
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  color: "#000000",
                },
          }}
          onClick={handleOpen}
        >
          {props.children}
        </Typography>
      </Box>
    );
  }

  const StylesTittle = {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: { xs: 16, sm: 22, md: 23, lg: 24, xl: 25 },
    fontWeight: "800",
    mb: { xs: 1, md: 2 },
  };

  const StylesSudTittle = {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: { xs: 14, sm: 18, md: 18, lg: 20, xl: 20 },
    fontWeight: "600",
    my: { xs: 1, md: 2 },
  };

  const StylesParagraph = {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: { xs: 12, sm: 16, md: 16, lg: 18, xl: 18 },
    fontWeight: "400",
  };

  return (
    <>
      <FooterButton m={0.2} Click={true}>
        How it works
      </FooterButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <Typography sx={StylesTittle}>Getting Started</Typography>
            </Grid>
            <Grid item xs={6} alignSelf={"center"}>
              <Typography sx={StylesSudTittle}>Getting Started</Typography>
              <Typography sx={StylesParagraph}>
                What is an NFT? What is a wallet? Why do I need one? What makes
                koolikart different
              </Typography>
            </Grid>
            <Grid item xs={6} alignSelf={"center"}>
              <Typography sx={StylesSudTittle}>Troubleshooting</Typography>
              <Typography sx={StylesParagraph}>
                Can i pay with a credit card How do i buy my first nft How much
                does it cost to create an NFT?
              </Typography>
            </Grid>
            <Grid item xs={6} alignSelf={"center"}>
              <Typography sx={StylesSudTittle}>Using koolikart</Typography>
              <Typography sx={StylesParagraph}>
                How it works How much does it cost How do I sell my NFT on
                koolikart?
              </Typography>
            </Grid>
            <Grid item xs={6} alignSelf={"center"}>
              <Typography sx={StylesSudTittle}>
                Safety, Security, and Policies
              </Typography>
              <Typography sx={StylesParagraph}>
                Where can I find koolikart terms and conditions? What are your
                community rules and guidelines? What is koolikart privacy
                policy?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ButtonPrimary width="100%" onClick={handleClose}>
                Close
              </ButtonPrimary>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
