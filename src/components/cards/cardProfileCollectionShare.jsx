import { Box } from "@mui/material";
import ButtonShare from "@/components/buttons/buttonShare";
import ButtonFollows from "@/components/buttons/buttonFollow";

export default function CollectionShare(props) {
  let collectionAddress = props.dataObj.collectionAddress;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <ButtonShare
        myShareUrl={`https://www.koolinart.com/perfil-artist/${collectionAddress}`}
      />
    </Box>
  );
}
