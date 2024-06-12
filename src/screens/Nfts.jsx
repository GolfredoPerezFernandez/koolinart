import { NftsContext } from "@/context/Nfts/NftsContext";
import { useBoundStore } from "@/store/index";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import FilterNfts from "@/components/filters/filterNfts";
import ButtonUp from "@/components/buttons/buttonUp";
import InfiniteScroll from "react-infinite-scroll-component";
import CardNft from "@/components/cards/card";

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
          navigate(`/`);
        }}
      >
        Nfts
      </Typography>
    </Box>
  );
};

export default function Nfts() {
  const { GetPageNfts, GetTotalPageNfts, GetPageNftsVarious } =
    useContext(NftsContext);
  const {
    PageNfts,
    TotalPageNfts,
    PageNftsFilter,
    FilterCoincidencePageNftVariousCategories,
    ChangePageNfts,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
  } = useBoundStore((state) => state, shallow);
  const [isAtTop, setIsAtTop] = useState(true);

  const NftsItems = () => {
    const Clear = () => {
      // function handleClickItemAll() {
      //   async function fetch(typeTotal) {
      //     setStateExplore("AllAgain");
      //     const total = await Moralis.Cloud.run("getTotalNftExplore", {
      //       typeTotal,
      //     });
      //     setTotal(Math.ceil(total / 8));
      //     await getNftPageExplore(1);
      //     setStateExplore("All");
      //   }
      //   fetch("All");
      // }

      return (
        <Button
        //  onClick={handleClickItemAll}
        >
          <CachedIcon
            sx={{ color: "#C02327", outline: "2px solid ", borderRadius: 3 }}
          />
        </Button>
      );
    };
    async function NextNfts() {
      try {
        switch (PageNftsFilter) {
          case "All":
            await GetPageNfts(PageNfts.length);
            break;
          case "FilterSingle":
          case "FilterVarious":
            GetPageNftsVarious(
              PageNfts.length,
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
          dataLength={PageNfts.length}
          next={NextNfts}
          hasMore={TotalPageNfts > PageNfts.length}
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Grid container rowSpacing="40px" sx={StyleContainer}>
            {PageNfts?.map((value, index) => {
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
      </Box>
    );
  };
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      if (isTop !== isAtTop) {
        setIsAtTop(isTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAtTop]);
  useEffect(() => {
    if (isAtTop) {
      ChangePageNfts(PageNfts.slice(0, 12));
    }
  }, [isAtTop]);
  useEffect(() => {
    async function fetchNft() {
      await GetPageNfts(PageNfts.length);
      await GetTotalPageNfts();
    }
    fetchNft();
  }, []);
  return (
    <Box sx={StyledContainer}>
      <Top />
      <ButtonUp />
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <InputSearchGlobals
            title="Search artist"
            // filterOptions={FilterCoincidenceHome}
            //  GetFilterGlobal={GetFilterCoincidenceHome}
          />
        </Box>
        <FilterNfts />
      </Box>
      <NftsItems />
    </Box>
  );
}
