import { useContext, useEffect } from "react";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { useBoundStore } from "@/store/index";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { SubscriptionsContext } from "@/context/Subscriptions/SubscriptionsContext";

import Datanft from "@/components/profileNft/dataNft";
import ImageNft from "@/components/profileNft/imageNft";
import TabsGlobal from "@/components/tabs/tabsGlobal";

export default function ProfileNft() {
  const { collect, id } = useParams();
  const { GetProfileNft }: any = useContext(NftsContext);
  const { ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert, ProfileNft } =
    useBoundStore((state: any) => state, shallow);
  const { SubscriptionNftPerfilNft }: any = useContext(SubscriptionsContext);

  useEffect(() => {
    async function fecthGetProfile() {
      try {
        console.log("entro")
        await GetProfileNft(collect, id);
      } catch (error) {
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    }
    fecthGetProfile();
  }, []);
  useEffect(() => {
    async function fecth() {
      try {
        await SubscriptionNftPerfilNft(ProfileNft?.objectId);
      } catch (error) {
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    }
    fecth();
  }, [ProfileNft]);

  const Top = () => {
    let navigate = useNavigate();
    return (
      <Box>
        <ArrowBackIosNewRounded
          sx={{
            color: "secondary.icon",
            cursor: "pointer",
            transition: "0.3s",
            ":hover": {
              color: "#C02327",
            },
          }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
        my: { xs: "20px", md: "30px", lg: "40px" },
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <Top />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: { xs: "center", sm: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "30px", md: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "15px", sm: "20px" },
            width: {
              xs: "250px",
              sm: "360px",
              md: "550px",
              lg: "750px",
              xl: "980px",
            },
          }}
        >
          <ImageNft />
          <TabsGlobal titlesTabs="perfilNft" />
        </Box>
        <Datanft />
      </Box>
    </Box>
  );
}
