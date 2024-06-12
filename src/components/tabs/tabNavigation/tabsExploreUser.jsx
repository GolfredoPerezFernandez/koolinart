import { useContext, useEffect, useState } from "react";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { Typography, Button, Box, Grid, CircularProgress } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import InfiniteScroll from "react-infinite-scroll-component";
import CardUser from "@/components/cards/cardUser";

function StyleContainer() {
  return {
    my: { xs: "15px", lg: "20px" },
  };
}

const User = () => {
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
    try {
      async function fetchNft() {
        await GetPageExploreUser(PageExploreUser.length);
        await GetTotalPageExploreUser();
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
          title="Search Users"
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
                md={6}
                lg={3}
                xl={3}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardUser data={value} />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default User;
