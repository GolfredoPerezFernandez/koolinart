import React, { lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1200 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1200, min: 900 },
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

const CardTopSellers = lazy(() => import("@/components/cards/cardTopSellers"));
function StyledContainer() {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "30px",
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
function StyledContainerCarousel() {
  return {
    my: { xs: "20px", md: "30px", lg: "35px" },
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };
}
function StyledContainerSecondary() {
  return {
    my: { xs: "20px", md: "30px", lg: "35px" },
    height: { xs: "100%", md: "400px", lg: "410px", xl: "500px" },
  };
}
function StyledContainerTopSellersSmall() {
  return {
    display: "flex",
    justifyContent: "space-between",
  };
}
export default function TopSellers() {
  const { CarouselTopSellers } = useBoundStore((state) => state, shallow);

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
        Top Sellers
      </Typography>
      <Suspense
        fallback={
          <Typography variant="h2" textAlign="center">
            Loading...
          </Typography>
        }
      >
        <Box sx={StyledContainerSecondary}>
          <Box
            sx={{
              height: "100%",
              display: { xs: "none", md: "flex" },
              gap: { xs: "0px", md: "20px", lg: "80px", xl: "120px" },
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {CarouselTopSellers.map((element, index) => {
                if (index === 0) {
                  return (
                    <Box key={index}>
                      <CardTopSellers dataObjNft={element} itemOne={true} />
                    </Box>
                  );
                }
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                gap: { xs: "15px", xl: "50px" },
              }}
            >
              <Box sx={StyledContainerTopSellersSmall}>
                {CarouselTopSellers.map((element, index) => {
                  if (index > 0 && index < 6) {
                    return (
                      <Box key={index}>
                        <CardTopSellers dataObjNft={element} itemOne={false} />
                      </Box>
                    );
                  }
                })}
              </Box>
              <Box sx={StyledContainerTopSellersSmall}>
                {CarouselTopSellers.map((element, index) => {
                  if (index > 5 && index < 11) {
                    return (
                      <Box key={index}>
                        <CardTopSellers dataObjNft={element} itemOne={false} />
                      </Box>
                    );
                  }
                })}
              </Box>
            </Box>
          </Box>
          {/* Carousel Top sellers responsive */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
            }}
          >
            <Carousel
              arrows
              infinite
              keyBoardControl={true}
              showDots={false}
              responsive={responsive}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {CarouselTopSellers !== null &&
                CarouselTopSellers.map((element, index) => {
                  return (
                    <Box key={index} sx={StyledContainerCarousel}>
                      <CardTopSellers
                        dataObjNft={element}
                        itemOne={index == 0 ? true : false}
                      />
                    </Box>
                  );
                })}
            </Carousel>
          </Box>
        </Box>
      </Suspense>
    </Box>
  );
}
