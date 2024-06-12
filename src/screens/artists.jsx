import { useContext, useEffect, useState } from "react";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";

import { useBoundStore } from "@/store/index";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Grid, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import InfiniteScroll from "react-infinite-scroll-component";
import CardUser from "@/components/cards/cardUser";
import ButtonUp from "@/components/buttons/buttonUp";
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
        Artist
      </Typography>
    </Box>
  );
};
const ArtistsItems = () => {
  const {
    GetPageExploreUser,
    GetTotalPageExploreUser,
    GetFilterValuePageExploreUser,
  } = useContext(NftsContext);
  const { GetFilterCoincidenceExploreUsers } = useContext(InputsSearchContext);
  const {
    PageExploreUser,
    TotalPageExploreUser,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    FilterCoincidenceExploreUsers,
  } = useBoundStore((state) => state, shallow);

  const Clear = () => {
    const [loader, setLoader] = useState(false);

    function handleClickItemAll() {
      async function fetch(reset) {
        setLoader(true);
        await GetPageExploreUser(0, reset);
        await GetTotalPageExploreUser();
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
      await GetPageExploreUser(PageExploreUser.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    async function fetchNft() {
      await GetPageExploreUser(PageExploreUser.length);
      await GetTotalPageExploreUser();
    }
    fetchNft();
  }, []);

  return (
    <Box sx={StyledContainerItems}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <InputSearchGlobals
          title="Search Artist"
          filterOptions={FilterCoincidenceExploreUsers}
          GetFilterGlobal={GetFilterCoincidenceExploreUsers}
          goTo={false}
          SetFuction={GetFilterValuePageExploreUser}
        />
        <Clear />
      </Box>
      <InfiniteScroll
        dataLength={PageExploreUser.length}
        next={NextNfts}
        hasMore={TotalPageExploreUser > PageExploreUser.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowSpacing="40px" sx={StyleContainer}>
          {PageExploreUser?.map((value, index) => {
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
                <CardUser data={value} />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default function Artists() {
  return (
    <Box sx={StyledContainer}>
      <ButtonUp />
      <Top />
      <ArtistsItems />
    </Box>
  );
}
