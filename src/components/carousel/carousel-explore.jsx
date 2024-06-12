import { lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CardNft = lazy(() => import("@/components/cards/card"));
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1900 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1900, min: 1400 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1400, min: 900 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
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

export default function CarouselLive() {
  const { NftCarouselExplore } = useBoundStore((state) => state, shallow);

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
        Explore
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
          {NftCarouselExplore !== null &&
            NftCarouselExplore.map((nft, index) => {
              return (
                <Box key={index} sx={StyledContainerCard}>
                  <CardNft dataObjNft={nft} />
                </Box>
              );
            })}
        </Carousel>
      </Suspense>
    </Box>
  );
}
