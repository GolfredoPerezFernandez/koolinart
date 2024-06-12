import { useState, useContext, useEffect } from "react";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { Typography, Button, Box, Grid, CircularProgress } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import InfiniteScroll from "react-infinite-scroll-component";
import CardCollections from "@/components/cards/cardCollections";

function StyleContainer() {
  return {
    my: { xs: "15px", lg: "20px" },
  };
}

const Colletions = () => {
  const {
    GetPageExploreCollections,
    GetTotalPageExploreColletions,
    GetFilterValuePageExploreCollections,
  } = useContext(NftsContext);
  const { GetFilterCoincidenceExploreCollections } =
    useContext(InputsSearchContext);

  const {
    PageExploreCollections,
    TotalPageExploreCollections,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    FilterCoincidenceExploreCollections,
  } = useBoundStore((state) => state, shallow);

  const Clear = () => {
    const [loader, setLoader] = useState(false);

    function handleClickItemAll() {
      async function fetch(reset) {
        setLoader(true);
        await GetPageExploreCollections(0, reset);
        await GetTotalPageExploreColletions();

        setLoader(false);
      }
      fetch(true);
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
      await GetPageExploreCollections(PageExploreCollections.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetPageExploreCollections(PageExploreCollections.length);
        await GetTotalPageExploreColletions();
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
          title="Search Collections"
          filterOptions={FilterCoincidenceExploreCollections}
          GetFilterGlobal={GetFilterCoincidenceExploreCollections}
          goTo={false}
          SetFuction={GetFilterValuePageExploreCollections}
        />
        <Clear />
      </Box>
      <InfiniteScroll
        dataLength={PageExploreCollections.length}
        next={NextNfts}
        hasMore={TotalPageExploreCollections > PageExploreCollections.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowSpacing="40px" sx={StyleContainer}>
          {PageExploreCollections?.map((value, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardCollections dataObjNft={value} />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Colletions;
