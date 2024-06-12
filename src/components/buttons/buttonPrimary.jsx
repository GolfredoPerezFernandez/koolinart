import Button from "@mui/material/Button";

function ButtonStyles(
  width = "auto",
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
    transition: "0.6s",
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

export default function ButtonPrimary(props) {
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
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
