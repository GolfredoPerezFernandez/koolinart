import { Box, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

import { useBoundStore } from "@/store/index";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { shallow } from "zustand/shallow";

const CardCollections = lazy(() =>
  import("@/components/cards/cardCollections")
);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1750 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1750, min: 1400 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1400, min: 700 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};
function StyledContainer() {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    justifyContent: "center",
  };
}
function StyledArrow(side) {
  return {
    [side]: "0px",
    position: "absolute",
    color: "#C02327",
    fontSize: { xs: "35px", sm: "40px", md: "50px" },
  };
}
function StyledContainerCard() {
  return {
    my: { xs: "20px", md: "30px", lg: "35px" },
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };
}

export default function CarouselCollection() {
  const { CollectionCarousel } = useBoundStore((state) => state, shallow);

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    return (
      <KeyboardArrowRight
        sx={StyledArrow("right")}
        onClick={() => onClick()}
        style={{ cursor: "pointer" }}
      />
    );
  };
  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    return (
      <KeyboardArrowLeft
        sx={StyledArrow("left")}
        onClick={() => onClick()}
        style={{ cursor: "pointer" }}
      />
    );
  };

  return (
    <Box sx={StyledContainer}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          color: "text.secondary",
        }}
      >
        Hot collections
      </Typography>

      <Suspense
        fallback={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
      >
        <Carousel
          arrows
          infinite
          showDots={false}
          responsive={responsive}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {CollectionCarousel !== null &&
            CollectionCarousel.map((nft, index) => {
              const dataNftCarouselCollect = JSON.stringify(nft);
              const dataObjNft = JSON.parse(dataNftCarouselCollect);

              return (
                <Box key={index} sx={StyledContainerCard}>
                  <CardCollections dataObjNft={dataObjNft} />
                </Box>
              );
            })}
        </Carousel>
      </Suspense>
    </Box>
  );
}
