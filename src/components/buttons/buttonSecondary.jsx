import Button from "@mui/material/Button";
function ButtonStyles(
  width = "auto",
  height = { xs: "32px", sm: "32px", md: "35px" },
  padding = {
    xs: "8px 10px",
    sm: "12px",
    md: "10px 15px",
    lg: "18px 20px",
  }
) {
  return {
    textAlign: "center",
    backgroundColor: "transparent",
    borderRadius: "10px",
    height: height,
    width: width,
    padding: padding,
    color: "text.secondary",
    outline: "2px solid #C02327",
    transition: "0.6s",
    "&:hover": {
      backgroundColor: "#C02327",
      color: "common.white",
    },
  };
}

export default function ButtonSecondary(props) {
  let backgroundColor = "#C02327";
  if (props.disabled) {
    backgroundColor = "#595959";
  }
  return (
    <Button
      disabled={props.disabled}
      type={props.type}
      sx={ButtonStyles(props.width, props.height, props.padding)}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
