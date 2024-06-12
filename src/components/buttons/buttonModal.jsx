import Button from "@mui/material/Button";

function ButtonStyles(
  width = { xs: "120px", md: "130px", lg: "150px" },
  height = { xs: "120px", md: "130px", lg: "150px" },
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
    textWrap: "balance",
    backgroundColor: backgroundColor,
    borderRadius: "30px",
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

export default function ButtonModal(props) {
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
