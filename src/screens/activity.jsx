import { useContext, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import ButtonUp from "@/components/buttons/buttonUp";
import InfiniteScroll from "react-infinite-scroll-component";
import CardActivity from "@/components/cards/cardActivity";
import CheckFilter from "@/components/filters/checkFilter";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "30px", md: "20px", lg: "25px" },
    mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
    my: { xs: "20px", md: "30px", lg: "40px" },
  };
}
function StyleContainerGrid() {
  return {
    my: { xs: "15px", lg: "20px" },
  };
}
function StyledContainerItems() {
  return {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
  };
}
const Top = () => {
  let navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          color: "text.secondary",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Activity
      </Typography>
    </Box>
  );
};
const ActivityItems = () => {
  const { GetPageActivity, GetTotalPageActivity } = useContext(NftsContext);
  const {
    PageActivity,
    TotalPageActivity,
    PageActivityFilter,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
  } = useBoundStore((state) => state, shallow);

  async function NextNfts() {
    try {
      await GetPageActivity(PageActivity.length, PageActivityFilter);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }
  useEffect(() => {
    async function fetchNft() {
      await GetPageActivity(PageActivity.length, PageActivityFilter);
      await GetTotalPageActivity(PageActivityFilter);
    }
    fetchNft();
  }, []);
  useEffect(() => {
    async function fetchNft() {
      await GetPageActivity(0, PageActivityFilter);
      await GetTotalPageActivity(PageActivityFilter);
    }
    fetchNft();
  }, [PageActivityFilter]);
  return (
    <Box sx={StyledContainerItems}>
      <Box
        sx={{
          position: { xs: "relative", sm: "sticky" },
          top: { xs: 0, sm: "120px" },
          height: "fit-content",
          my: { xs: "10px", sm: "55px" },
          display: "flex",
          justifyContent: "center",
          order: { xs: "0", sm: "2" },
        }}
      >
        <CheckFilter />
      </Box>
      <Box sx={{ width: "100%" }}>
        <InfiniteScroll
          dataLength={PageActivity.length}
          next={NextNfts}
          hasMore={TotalPageActivity > PageActivity.length}
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden", width: "inherit" }}
        >
          <Grid container rowSpacing="40px" sx={StyleContainerGrid}>
            {PageActivity?.map((value, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={4}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardActivity data={value} />
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default function Activity() {
  return (
    <Box sx={StyledContainer}>
      <ButtonUp />
      <Top />
      <ActivityItems />
    </Box>
  );
}
