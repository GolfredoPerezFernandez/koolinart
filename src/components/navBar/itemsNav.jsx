import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ItemsNav(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <Box display="flex" alignItems="center" mx="5px">
      <Typography
        variant="body1"
        sx={{
          color:
            location.pathname === props.to ? "text.primary" : "text.secondary",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "text.primary",
            fontWeight: "500",
          },
        }}
        onClick={() => navigate(`${props.to}`)}
      >
        {props.children}
      </Typography>
    </Box>
  );
}
