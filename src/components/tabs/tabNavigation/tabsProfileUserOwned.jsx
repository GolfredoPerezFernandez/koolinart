import { useContext, useEffect } from "react";
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { UserContext } from "@/context/User/UserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import CardNft from "@/components/cards/card";

export default function TabsProfileUserOwned() {
  const {
    ProfileUserNftOwned,
    TotalProfileUserNftOwned,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    ThemeModeState,
  } = useBoundStore((state) => state, shallow);
  const { GetProfileUserNftOwned, GetTotalProfileUserNftOwned } =
    useContext(UserContext);
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  async function NextNfts() {
    try {
      await GetProfileUserNftOwned(ProfileUserNftOwned.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetProfileUserNftOwned(ProfileUserNftOwned.length);
        await GetTotalProfileUserNftOwned();
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
      <InfiniteScroll
        dataLength={ProfileUserNftOwned.length}
        next={NextNfts}
        hasMore={TotalProfileUserNftOwned > ProfileUserNftOwned.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowGap="20px" py="20px">
          {ProfileUserNftOwned.length != 0 ? (
            ProfileUserNftOwned?.map((value, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={3}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardNft dataObjNft={value} />
                </Grid>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                image={ghost_koolinart}
                alt="Image NFT"
                sx={{
                  width: "250px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Nothing found
              </Typography>
            </Box>
          )}
        </Grid>
      </InfiniteScroll>
    </>
  );
}
