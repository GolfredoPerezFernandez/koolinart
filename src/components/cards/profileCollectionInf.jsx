import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import Clipboard from "@/components/clipboard/clipboard";

function StyledDivider() {
  return {
    borderColor: "secondary.icon",
    borderWidth: "1.5px",
  };
}
const CollectionInf = (props) => {
  let collectionAddress = props.dataObj?.collectionAddress
    ? props.dataObj.collectionAddress
    : "";
  let floorPrice = props.dataObj?.floorPrice ? props.dataObj.floorPrice : "";
  let volumenCollection = props.dataObj?.volumenCollection
    ? props.dataObj.volumenCollection
    : "";
  let items = props.dataObj?.items ? props.dataObj.items : "";
  return (
    <Card
      sx={{
        boxShadow:
          "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.115017), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
        borderRadius: "30px",
        height: "fit-content",
        mx: "auto",
        p: "5px",
        width: {
          xs: "250px",
          sm: "280px",
          md: "290px",
          lg: "300px",
          xl: "380px",
        },
        backgroundColor: "primary.main",
        border: "3px solid",
        borderColor: "secondary.icon",
        transition: "0.3s",
        "&:hover": {
          border: "4px solid",
          borderColor: "secondary.icon",
          mt: "-10px",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            p: "20px",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            Floor ............ {floorPrice}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            Volumen ............ {volumenCollection}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            Items ............ {items}
          </Typography>
          <Divider sx={StyledDivider} />
          {!collectionAddress ? (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              Nothing found
            </Typography>
          ) : (
            <Clipboard value={collectionAddress} title="Address" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionInf;
