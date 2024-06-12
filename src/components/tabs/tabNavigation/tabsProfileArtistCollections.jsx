import { useContext, useEffect } from "react";
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { ArtistContext } from "@/context/Artist/ArtistContext";

import InfiniteScroll from "react-infinite-scroll-component";
import CardCollections from "@/components/cards/cardCollections";

export default function TabsProfileArtistCollections() {
  const {
    ArtistCollection,
    ArtistTotalCollection,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    ThemeModeState,
    ChangeArtistCollection,
    ChangeArtistTotalCollection,
  } = useBoundStore((state) => state, shallow);
  const { GetProfileArtistCollection, GetTotalProfileArtistCollection } =
    useContext(ArtistContext);
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  async function NextNfts() {
    try {
      await GetProfileArtistCollection(ArtistCollection.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetProfileArtistCollection(ArtistCollection.length);
        await GetTotalProfileArtistCollection();
      }
      fetchNft();
      return async () => {
        ChangeArtistCollection([]);
        ChangeArtistTotalCollection(0);
      };
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={ArtistCollection.length}
        next={NextNfts}
        hasMore={ArtistTotalCollection > ArtistCollection.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowGap="20px" py="20px">
          {ArtistCollection.length != 0 ? (
            ArtistCollection?.map((value, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  lg={6}
                  xl={4}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CardCollections dataObjNft={value} />
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
