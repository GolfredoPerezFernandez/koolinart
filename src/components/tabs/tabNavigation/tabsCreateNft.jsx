import PutOnSale from "@/components/form/createNft/putOnSale";
import { Box } from "@mui/material";

export default function TabsNavigationCreateNft() {
  return (
    <Box sx={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <PutOnSale />
    </Box>
  );
}
