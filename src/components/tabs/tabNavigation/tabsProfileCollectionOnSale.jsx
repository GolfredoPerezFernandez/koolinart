import { useContext, useEffect } from "react";
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { CollectionContext } from "@/context/Collection/CollectionContext";
import { useParams } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import CardNft from "@/components/cards/card";

export default function TabsProfileCollectionOnSale() {
  const {
    CollectionOnSale,
    TotalCollectionOnSale,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    ThemeModeState,
    ChangeCollectionOnSale,
    ChangeTotalCollectionOnSale,
  } = useBoundStore((state) => state, shallow);
  const { GetProfileCollectionOnSale, GetTotalProfileCollectionOnSale } =
    useContext(CollectionContext);
  const { collectionAddress } = useParams();

  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  async function NextNfts() {
    try {
      await GetProfileCollectionOnSale(
        CollectionOnSale.length,
        collectionAddress
      );
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      async function fetchNft() {
        await GetProfileCollectionOnSale(
          CollectionOnSale.length,
          collectionAddress
        );
        await GetTotalProfileCollectionOnSale(collectionAddress);
      }
      fetchNft();
      return async () => {
        ChangeCollectionOnSale([]);
        ChangeTotalCollectionOnSale(0);
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
        dataLength={CollectionOnSale.length}
        next={NextNfts}
        hasMore={TotalCollectionOnSale > CollectionOnSale.length}
        loader={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
        style={{ overflow: "hidden" }}
      >
        <Grid container rowGap="20px" py="20px">
          {CollectionOnSale.length != 0 ? (
            CollectionOnSale?.map((value, index) => {
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
                Nothing founds
              </Typography>
            </Box>
          )}
        </Grid>
      </InfiniteScroll>
    </>
  );
}
