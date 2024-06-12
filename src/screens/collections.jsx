import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { useBoundStore } from "@/store/index";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import ButtonUp from "@/components/buttons/buttonUp";
import InfiniteScroll from "react-infinite-scroll-component";
import CardCollections from "@/components/cards/cardCollections";
import CachedIcon from "@mui/icons-material/Cached";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "30px", md: "20px", lg: "25px" },
    mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
    my: { xs: "20px", md: "30px", lg: "40px" },
  };
}
function StyleContainer() {
  return {
    my: { xs: "15px", lg: "20px" },
  };
}
function StyledContainerItems() {
  return {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
        Collections
      </Typography>
    </Box>
  );
};

export default function Collections() {
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
  const NftsItems = () => {
    async function NextNfts() {
      try {
        switch (PageNftsFilter) {
          case "All":
            await GetPageNfts(PageExploreCollections.length);
            break;
          case "FilterSingle":
          case "FilterVarious":
            GetPageNftsVarious(
              PageExploreCollections.length,
              FilterCoincidencePageNftVariousCategories
            );
        }
      } catch (error) {
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    }
    return (
      <Box sx={StyledContainerItems}>
        <InfiniteScroll
          dataLength={
            PageExploreCollections.length != undefined
              ? PageExploreCollections.length
              : 0
          }
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
                  xl={2}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <CardCollections dataObjNft={value} />
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      </Box>
    );
  };

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetPageExploreCollections(PageExploreCollections.length);
        await GetTotalPageExploreColletions();
      }
      fetchNft();
    } catch (error) {}
  }, []);
  return (
    <Box sx={StyledContainer}>
      <Top />
      <ButtonUp />
      <Box sx={{ display: "flex", gap: "10px" }}>
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
      </Box>
      <NftsItems />
    </Box>
  );
}
