import { Box } from "@mui/material";
import ButtonShare from "@/components/buttons/buttonShare";
import ButtonFollows from "@/components/buttons/buttonFollow";

export default function ArtistFollowAndShare(props) {
  let ethAddress = props.dataObj.ethAddress;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <ButtonShare
        myShareUrl={`https://www.koolinart.com/perfil-artist/${ethAddress}`}
      />
      <ButtonFollows followings={ethAddress} />
    </Box>
  );
}
