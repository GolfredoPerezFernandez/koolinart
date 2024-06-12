import { Box } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import TabsAccordion from "@/components/accordion/accordion";
import CardActivityPerfilNft from "@/components/cards/cardActivityPerfilNft";

export default function TabsActivity() {
  const { ProfileNftActivity } = useBoundStore((state) => state, shallow);
  return (
    <TabsAccordion tittle="Activity">
      {ProfileNftActivity.map((element, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              height: {
                xs: "190px",
                sm: "190px",
                md: "210px",
                lg: "250px",
                xl: "260px",
              },
            }}
          >
            <CardActivityPerfilNft dataObjNft={element} />
          </Box>
        );
      })}
    </TabsAccordion>
  );
}
