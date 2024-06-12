import { Box, Divider } from "@mui/material";
import CarouselFullWidth from "@/components/carousel/carousel-full-width";
import CarouselLiveAuctions from "@/components/carousel/carousel-live-auctions";
import TopSellers from "@/components/carousel/top-sellers";
import CarouselExplore from "@/components/carousel/carousel-explore";
import CarouselCollections from "@/components/carousel/carousel-hot-collections";
import PreFooter from "@/components/footer/pre-footer";
import ButtonUp from "@/components/buttons/buttonUp";

import useDataRenderHome from "@/hooks/getDataRenderHome";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "30px", md: "35px", lg: "40px" },
    mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
  };
}
function StyledDivider() {
  return {
    height: "2px",
    backgroundColor: "common.two",
  };
}
export default function Home() {
  useDataRenderHome();

  return (
    <Box sx={StyledContainer}>
      <ButtonUp />
      <CarouselFullWidth />
      <Divider sx={StyledDivider} />
      <CarouselLiveAuctions />
      <Divider sx={StyledDivider} />
      <TopSellers />
      <Divider sx={StyledDivider} />
      <CarouselExplore />
      <Divider sx={StyledDivider} />
      <CarouselCollections />
      <Divider sx={StyledDivider} />
      <PreFooter />
    </Box>
  );
}
