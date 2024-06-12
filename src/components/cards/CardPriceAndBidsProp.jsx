import { Typography, Card, CardContent } from "@mui/material";

function StyledCard() {
  return {
    height: { xs: "90px", md: "110px", lg: "180px" },
    width: { xs: "90px", md: "95px", lg: "100px" },
    padding: "5px",
    backgroundColor: "background.default",
  };
}
function StyledTypographyh() {
  return {
    color: "text.secondary",
    opacity: "0.8",
    textAlign: "center",
  };
}
function StyledCardContent() {
  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  };
}
const CardPriceAndBidsProp = (props) => {
  return (
    <Card sx={StyledCard}>
      <CardContent sx={StyledCardContent}>
        <Typography sx={StyledTypographyh}>{props.title}</Typography>
        <Typography sx={StyledTypographyh}>
          {props.value ? props.value : 0}
        </Typography>
        <Typography sx={StyledTypographyh}>KNRT</Typography>
      </CardContent>
    </Card>
  );
};

export default CardPriceAndBidsProp;
