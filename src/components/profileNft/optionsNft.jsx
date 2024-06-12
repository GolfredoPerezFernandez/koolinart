import { useState, useContext } from "react";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { MintContext } from "@/context/Mint/MintContext";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardPriceAndBidsProp from "@/components/cards/CardPriceAndBidsProp";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import ModalBids from "@/components/modals/modalBids";
import PlaceForSaleBids from "@/components/form/placeForSaleBids";

function StyledBoxContainer() {
  return {
    backgroundColor: "background.default",
    display: "flex",
    flexDirection: "column",
    width: { xs: "250px", sm: "280px", md: "300px", lg: "360px" },
    justifyContent: "space-around",
    borderRadius: "35px",
    p: "15px",
    gap: { xs: "15px" },
  };
}
function StyledBoxContainerSecondary() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "20px" },
  };
}
function StyledBoxContainerTertiary() {
  return {
    display: "flex",
    flexDirection: "row",
    gap: { xs: "20px" },
  };
}

export default function OptionNfts() {
  const {
    buyNowPrice,
    minimumBid,
    highestBid,
    ownerAddress,
    ethAddress,
    collectionAddress,
    tokenId,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
    currentBid,
    forSale,
    UserRender,
    MarketType,
  } = useBoundStore(
    (state) => ({
      buyNowPrice: state.ProfileNft?.buyNowPrice,
      forSale: state.ProfileNft?.forSale,
      minimumBid: state.ProfileNft?.minimumBid,
      highestBid: state.ProfileNft?.highestBid,
      ownerAddress: state.ProfileNft?.ownerAddress,
      ethAddress: state.UserRender?.attributes?.ethAddress,
      collectionAddress: state.ProfileNft?.collectionAddress,
      NftFileMetadataPath: state.ProfileNft?.NftFileMetadataPath,
      tokenId: state.ProfileNft?.tokenId
        ? state.ProfileNft.tokenId
        : state.ProfileNft?.tokenIdAdmin
        ? state.ProfileNft.tokenIdAdmin
        : "",
      ChangeStateAlert: state.ChangeStateAlert,
      ChangeTypeAlert: state.ChangeTypeAlert,
      ChangeTitleAlert: state.ChangeTitleAlert,
      currentBid: state.ProfileNft?.highestBid
        ? state.ProfileNft.highestBid
        : state.ProfileNft?.minimumBid
        ? state.ProfileNft.minimumBid
        : "0",
      UserRender: state.UserRender,
      MarketType: state.ProfileNft.marketType,
    }),
    shallow
  );
  let navigate = useNavigate();

  const { HandleRemoveRule, OnBuyRule, HandleHighestRule } =
    useContext(MintContext);
  const [Loader, setLoader] = useState(false);

  async function BuyNow(buyNowPrice, tokenId, collectionAddress) {
    try {
      setLoader(true);
      if (UserRender.length == 0) {
        navigate(`/sign-in`), setLoader(false);
      } else {
        await OnBuyRule(buyNowPrice, tokenId, collectionAddress);
        ChangeTypeAlert(`success`),
          ChangeTitleAlert("Purchase made"),
          ChangeStateAlert(false);
        setLoader(false);
      }
    } catch (error) {
      ChangeTypeAlert(`error`),
        ChangeTitleAlert("auction lower than the highest bid"),
        ChangeStateAlert(true);
      setLoader(false);
    }
  }
  async function RemoveNft(collectionAddress, tokenId) {
    try {
      setLoader(true);
      if (UserRender.length == 0) {
        navigate(`/sign-in`), setLoader(false);
      } else {
        await HandleRemoveRule(collectionAddress, tokenId);
        ChangeTypeAlert(`success`),
          ChangeTitleAlert("Purchase made"),
          ChangeStateAlert(false);
        setLoader(false);
      }
    } catch (error) {
      ChangeTypeAlert(`error`),
        ChangeTitleAlert("auction lower than the highest bid"),
        ChangeStateAlert(true);
      setLoader(false);
    }
  }

  async function HandleHighest(tokenId, collectionAddress) {
    try {
      setLoader(true);
      if (UserRender.length == 0) {
        navigate(`/sign-in`), setLoader(false);
      } else {
        await HandleHighestRule(tokenId, collectionAddress);
        ChangeTypeAlert(`success`),
          ChangeTitleAlert("Purchase made"),
          ChangeStateAlert(false);
      }
    } catch (error) {
      ChangeTypeAlert(`error`),
        ChangeTitleAlert("auction lower than the highest bid"),
        ChangeStateAlert(true);
      setLoader(false);
    }
  }

  async function handleBurn(collectionAddress, tokenId) {
    try {
      setLoader(true);
      if (UserRender.length == 0) {
        navigate(`/sign-in`), setLoader(false);
      } else {
        await handleBurnRule(tokenId, collectionAddress);
        ChangeTypeAlert(`success`),
          ChangeTitleAlert("Purchase made"),
          ChangeStateAlert(false);
      }
    } catch (error) {
      ChangeTypeAlert(`error`),
        ChangeTitleAlert("auction lower than the highest bid"),
        ChangeStateAlert(true);
      setLoader(false);
    }
  }

  return (
    <Card sx={StyledBoxContainer}>
      {buyNowPrice != undefined && buyNowPrice != 0 ? (
        <Box sx={StyledBoxContainerSecondary}>
          <Box sx={StyledBoxContainerTertiary}>
            <CardPriceAndBidsProp title="Price" value={buyNowPrice} />
            {!minimumBid || "0" ? (
              <CardPriceAndBidsProp title="Min Price" value={minimumBid} />
            ) : null}

            {!highestBid || "0" ? (
              <CardPriceAndBidsProp title="Highest bid" value={highestBid} />
            ) : null}
          </Box>
          {ethAddress !== ownerAddress && buyNowPrice != 0 ? (
            <ButtonPrimary
              width="100%"
              disabled={Loader}
              onClick={() => BuyNow(buyNowPrice, tokenId, collectionAddress)}
            >
              {Loader ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "Buy now"
              )}
            </ButtonPrimary>
          ) : null}

          {ethAddress !== ownerAddress &&
          highestBid != 0 &&
          MarketType === "bids" ? (
            <ModalBids />
          ) : null}
        </Box>
      ) : null}
      {ethAddress === ownerAddress &&
      buyNowPrice != undefined &&
      buyNowPrice != 0 ? (
        <ButtonPrimary
          width="100%"
          disabled={Loader}
          onClick={() => {
            RemoveNft(collectionAddress, tokenId);
          }}
        >
          {Loader ? (
            <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
          ) : (
            "Remove of market"
          )}
        </ButtonPrimary>
      ) : null}
      {ethAddress === ownerAddress &&
      currentBid != "0" &&
      minimumBid < currentBid ? (
        <ButtonPrimary
          width="100%"
          disabled={Loader}
          onClick={() => {
            HandleHighest(tokenId, collectionAddress);
          }}
        >
          {Loader ? (
            <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
          ) : (
            "Take Highest Bid"
          )}
        </ButtonPrimary>
      ) : null}
      {ethAddress === ownerAddress &&
      forSale === false &&
      buyNowPrice != undefined &&
      buyNowPrice != 0 &&
      UserRender.length != 0 ? (
        <ButtonPrimary
          width="100%"
          disabled={Loader}
          onClick={() => {
            handleBurn(tokenId, collectionAddress);
          }}
        >
          {Loader ? (
            <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
          ) : (
            "Burn nft"
          )}
        </ButtonPrimary>
      ) : null}
      {ethAddress === ownerAddress &&
      buyNowPrice != undefined &&
      buyNowPrice != 0 &&
      forSale === false &&
      UserRender.length != 0 ? (
        <PlaceForSaleBids />
      ) : null}
      {buyNowPrice === 0 ? (
        <Typography
          variant="h2"
          sx={{
            color: "text.secondary",
            cursor: "default",
            textAlign: "center",
          }}
        >
          Not For Sale
        </Typography>
      ) : null}
    </Card>
  );
}
