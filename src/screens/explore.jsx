import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import TabsExplore from "@/components/tabs/tabsExplore";
import ButtonUp from "@/components/buttons/buttonUp";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "10px", md: "15px", lg: "15px" },
    mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
    my: { xs: "20px", md: "30px", lg: "40px" },
  };
}

const Top = () => {
  let navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ArrowBackIosNewRounded
        sx={{
          color: "secondary.icon",
          cursor: "pointer",
          transition: "0.3s",
          ":hover": {
            color: "#C02327",
          },
        }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          color: "text.secondary",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Explore
      </Typography>
    </Box>
  );
};

export default function Explore() {
  return (
    <Box sx={StyledContainer}>
      <Top />
      <ButtonUp />
      <TabsExplore titlesTabs="Explore" />
    </Box>
  );
}
