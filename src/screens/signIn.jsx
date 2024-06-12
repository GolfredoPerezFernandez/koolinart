import FormSignIn from "@/components/form/signIn";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Top = () => {
  let navigate = useNavigate();

  return (
    <Box>
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
    </Box>
  );
};

export default function SignIn() {
  return (
    <Box
      sx={{
        mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
        my: { xs: "20px", md: "30px", lg: "20px" },
      }}
    >
      <Top />
      <FormSignIn />
    </Box>
  );
}
