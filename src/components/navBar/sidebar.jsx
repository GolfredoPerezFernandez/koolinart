import * as React from "react";
import { Typography, Drawer, Box } from "@mui/material";
import { ChevronRight, Menu } from "@mui/icons-material";
import ItemsNav from "@/components/navBar/itemsNav";

function StyledDrawer() {
  return {
    width: 0,
    flexShrink: 0,
    background: "red",
    "& .MuiDrawer-paper": {
      width: {
        xs: "220px",
        sm: "290px",
        md: "320px",
        lg: "350px",
        xl: "420px",
      },
      height: "fit-content",
      my: "15px",
      mx: { xs: "10px", sm: "20px" },
      p: "15px",
      borderRadius: "15px",
    },
  };
}
function StyledTypography() {
  return {
    color: "text.secondary",
    cursor: "default",
  };
}
export default function PersistentDrawerRight() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        onClick={handleDrawerOpen}
        color="inherit"
        sx={{
          color: "#C02327",
        }}
      />
      <Drawer sx={StyledDrawer} variant="persistent" anchor="right" open={open}>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={StyledTypography} variant="subtitle2">
              Menu
            </Typography>
            <ChevronRight onClick={handleDrawerClose} />
          </Box>
          <Box>
            <ItemsNav to="">Home</ItemsNav>
            <ItemsNav to="explore">Explore</ItemsNav>
            <ItemsNav to="activity">Activity</ItemsNav>
            <ItemsNav to="artists">Artists</ItemsNav>
            <ItemsNav to="Nfts">NFTS</ItemsNav>
            <ItemsNav to="collections">Collections</ItemsNav>
            <ItemsNav to="certificate-movement">Movement Certificates</ItemsNav>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
