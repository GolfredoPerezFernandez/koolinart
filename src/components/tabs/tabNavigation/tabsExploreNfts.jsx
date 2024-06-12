import { useContext, useEffect, useState } from "react";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { Typography, Button, Box, Grid, CircularProgress } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import InfiniteScroll from "react-infinite-scroll-component";
import CardNft from "@/components/cards/card";

function StyleContainer() {
  return {
    my: { xs: "15px", lg: "20px" },
  };
}

const Nfts = () => {
  const {
    GetPageExploreNft,
    GetTotalPageExploreNft,
    GetFilterValuePageExploreNft,
  } = useContext(NftsContext);
  const { GetFilterCoincidenceExploreNft } = useContext(InputsSearchContext);
  const {
    PageExploreNft,
    TotalPageExploreNft,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    FilterCoincidenceExploreNft,
  } = useBoundStore((state) => state, shallow);

  const Clear = () => {
    const [loader, setLoader] = useState(false);
    function handleClickItemAll() {
      setLoader(true);
      async function fetch(reset) {
        await GetPageExploreNft(0, reset);
        await GetTotalPageExploreNft();
        setLoader(false);
      }
      fetch("All");
    }

    return (
      <Button onClick={handleClickItemAll}>
        {loader ? (
          <CircularProgress size={25} sx={{ color: "secondary.main" }} />
        ) : (
          <CachedIcon
            sx={{ color: "#C02327", outline: "2px solid ", borderRadius: 3 }}
          />
        )}
      </Button>
    );
  };

  async function NextNfts() {
    try {
      await GetPageExploreNft(PageExploreNft.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetPageExploreNft(PageExploreNft.length);
        await GetTotalPageExploreNft();
      }
      fetchNft();
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <InputSearchGlobals
          title="Search Nfts"
          filterOptions={FilterCoincidenceExploreNft}
          GetFilterGlobal={GetFilterCoincidenceExploreNft}
          goTo={false}
          SetFuction={GetFilterValuePageExploreNft}
        />
        <Clear />
      </Box>
      <InfiniteScroll
        dataLength={PageExploreNft.length}
        next={NextNfts}
        hasMore={TotalPageExploreNft > PageExploreNft.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowSpacing="40px" sx={StyleContainer}>
          {PageExploreNft?.map((value, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardNft dataObjNft={value} />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Nfts;
