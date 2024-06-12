import Button from "@mui/material/Button";
import { ArrowCircleUpRounded } from "@mui/icons-material";
function ButtonStyles(
  width = "fit-content",
  height = { xs: "32px", sm: "32px", md: "35px" },
  padding = {
    xs: "8px 10px",
    sm: "12px",
    md: "10px 15px",
    lg: "18px 20px",
  },
  backgroundColor = "secondary.main",
  color = "common.white"
) {
  return {
    textAlign: "center",
    backgroundColor: backgroundColor,
    borderRadius: "10px",
    height: height == true ? { xs: "32px", sm: "32px", md: "45px" } : height,
    width: width,
    padding: padding,
    color: color,
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "100",
    transition: "0.6s",
    border: "2px solid",
    BorderColor: "common.two",
    "&:hover": {
      backgroundColor: "common.white",
      color: "text.primary",
      outline: "2px solid #C02327",
    },
    "&:disabled": {
      backgroundColor: "background.paper",
      color: "common.two",
    },
  };
}

export default function ButtonUp(props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      disabled={props.disabled}
      type={props.type}
      sx={ButtonStyles(
        props.width,
        props.height,
        props.padding,
        props.backgroundColor,
        props.color
      )}
      onClick={() => scrollToTop()}
    >
      <ArrowCircleUpRounded sx={{ fontSize: { xs: "25px", md: "30px" } }} />
    </Button>
  );
}
