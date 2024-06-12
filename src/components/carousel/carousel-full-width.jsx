import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CardMedia, Typography } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import {
  HorizontalRule,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import ButtonSecondary from "@/components/buttons/buttonSecondary";

function BoxTypography() {
  let navigate = useNavigate();
  function StyledContainer() {
    return {
      order: { xs: 2, md: 2 },
      display: "flex",
      flexDirection: "column",
      gap: { xs: "20px", xl: "40px" },
    };
  }
  function StyledTypography() {
    return {
      textAlign: { xs: "center", md: "start" },
      color: "text.secondary",
      textWrap: "pretty",
    };
  }
  function StyledContainerButton() {
    return {
      display: "flex",
      justifyContent: { xs: "space-evenly", lg: "center" },
      gap: { xs: "0px", lg: "80px", xl: "60px" },
    };
  }
  return (
    <Box sx={StyledContainer}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "800",
          textAlign: { xs: "center", md: "start" },
          fontSize: {
            xs: "1.8rem",
            sm: "2.5rem",
            md: "2.7rem",
            lg: "3.0rem",
            xl: "3.5rem",
          },
        }}
      >
        The largest NFT Marketplace
      </Typography>
      <Typography variant="h2" sx={StyledTypography}>
        Digital platform for fungible and non-fungible assets. Create, buy and
        sell tokens that represent any type of digital asset.
      </Typography>
      <Typography variant="h2" sx={StyledTypography}>
        such as: Intellectual Property, Digital Art, Real Estate, Contracts and
        more.
      </Typography>
      <Box sx={StyledContainerButton}>
        <ButtonPrimary
          onClick={() => {
            navigate(`/explore`);
          }}
        >
          Explore
        </ButtonPrimary>

        <ButtonSecondary
          onClick={() => {
            navigate(`/create-nft`);
          }}
        >
          Create
        </ButtonSecondary>
      </Box>
    </Box>
  );
}
function Carousel({ img }) {
  let defaultImage = {
    Image:
      "https://ipfs.moralis.io:2053/ipfs/QmWvVGr7Q7orpGABhhe3coyggRAq5cdXeQq3L6nz1bRH3K/0xE568887Bf75AeA78147730CC4101aDf09626759E/banner_koolinart.svg",
  };

  let imgCarousel = img;

  if (imgCarousel.length !== 3) {
    imgCarousel = imgCarousel.concat(
      Array(3 - imgCarousel.length).fill(defaultImage)
    );
  }
  let imageValues = imgCarousel.map((item) => item.Image);
  const [selectIndex, setSelectIndex] = useState(0);

  const [Loaded, setLoaded] = useState(false);
  const [LoadedTwo, setLoadedTwo] = useState(false);
  const [selectImage, setSelectImage] = useState(imageValues[0]);
  const [selectImageOther, setSelectImageOTher] = useState(imageValues[1]);
  const [selectImageOtherTwo, setSelectImageOtherTwo] = useState(
    imageValues[imageValues.length - 1]
  );

  const SelectNewItem = (index, images, next) => {
    setLoadedTwo(false);
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? index < images.length - 1 : index > 0;
      const nextIndex = next
        ? condition
          ? index + 1
          : 0
        : condition
        ? index - 1
        : images.length - 1;

      setTimeout(() => {
        setSelectImageOTher(
          images[nextIndex + 1 > images.length - 1 ? 0 : nextIndex + 1]
        );
        setSelectImageOtherTwo(
          images[nextIndex == 0 ? images.length - 1 : nextIndex - 1]
        );
        setLoadedTwo(true);
        setLoaded(true);
      }, 400);

      setSelectImage(images[nextIndex]);
      setSelectIndex(nextIndex);
    }, 800);
  };
  const previous = () => {
    SelectNewItem(selectIndex, imageValues, false);
  };
  const next = () => {
    SelectNewItem(selectIndex, imageValues, true);
  };
  const selectButtonItem = (index) => {
    setLoadedTwo(false);
    setLoaded(false);
    setTimeout(() => {
      setSelectIndex(index);
      setSelectImage(imageValues[index]);
      setSelectImageOTher(
        imageValues[index + 1 > imageValues.length - 1 ? 0 : index + 1]
      );
      setSelectImageOtherTwo(
        imageValues[
          index == 0
            ? imageValues.length - 1
            : index >= imageValues.length - 1
            ? imageValues.length - 2
            : index - 1
        ]
      );
    }, 500);
  };
  const handleImageLoad = (event) => {
    const image = event.target;
    const container = image.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // Calculate the aspect ratio of the image

    const aspectRatio = imageWidth / imageHeight;

    // Calculate the aspect ratio of the container
    const containerAspectRatio = containerWidth / containerHeight;

    // Decide the value of objectFit based on aspect ratios
    const objectFit = aspectRatio > containerAspectRatio ? "unset" : "cover";

    // Applies the objectFit value to the image style
    image.style.objectFit = objectFit;
  };
  function StyledCardCarouselSecondary(side) {
    return {
      width: { xs: "0px", md: "345px", xl: "420px" },
      height: { xs: "180px", xl: "200px" },
      borderRadius: { lg: "80px", xl: "100px" },
      position: "absolute",
      [side]: { xs: "5px", xl: "25px" },
      zIndex: 1,
      display: { xs: "none", lg: "flex" },
      opacity: LoadedTwo ? "0.5  " : "0",
      transition: "0.4s",
      "& loaded": {
        transition: "0.4s",
        opacity: "0",
      },
      boxShadow:
        "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 1.7776px 3.4221px rgba(0, 0, 0, 0.115017), 0px 8.3363px 7.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
    };
  }
  function StyledCardCarosuel() {
    return {
      width: {
        xs: "100%",
        sm: "550px",
        md: "400px",
        lg: "455px",
        xl: "750px",
      },
      height: { xs: "230px", sm: "290px", md: "240px", xl: "290px" },
      borderRadius: { xs: "30px", lg: "80px", xl: "100px" },
      zIndex: 100,
      objectFit: "contain",
      backgroundColor: "white",
      my: { xs: "10px", md: "20px" },
      opacity: Loaded ? "1" : "0",
      transition: "0.8s",
      "& loaded": {
        opacity: "0",
      },
      boxShadow:
        "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 1.7776px 3.4221px rgba(0, 0, 0, 0.115017), 0px 8.3363px 7.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
    };
  }
  function StyledArrow(side) {
    return {
      cursor: "pointer",
      color: "#EAE8E8",
      position: "absolute",
      [side]: { xs: " 0px", md: "30px", lg: "10px" },
      zIndex: 101,
      fontSize: { xs: "45px", lg: "35px", xl: "60px" },
      filter: "drop-shadow(2.5px 2.5px rgba(0,0,0,0.25))",
    };
  }
  function StyledContainerCarousel(hidden) {
    return {
      display: hidden ? { xs: "none", lg: "flex" } : "flex",
      width: {
        xs: "100%",
        sm: "550px",
        md: "450px",
        lg: "560px",
        xl: "950px",
      },
      justifyContent: "center",
      position: "relative",
      alignItems: "center",
    };
  }

  useEffect(() => {
    setSelectImage(imageValues[0]);
    setSelectImageOTher(imageValues[1]);
    setSelectImageOtherTwo(imageValues[imageValues.length - 1]);
  }, [img]);

  useEffect(() => {
    const interval = setInterval(() => {
      SelectNewItem(selectIndex, imageValues, true);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Box
      sx={{
        order: { xs: 1, md: 2 },
        width: { xs: "100%", xl: "auto" },
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "center", xl: "end" },
        flexDirection: "column",
      }}
    >
      <Box sx={StyledContainerCarousel()}>
        <CardMedia
          component="img"
          sx={StyledCardCarouselSecondary("left")}
          title="img"
          alt="img"
          image={selectImageOtherTwo}
          onLoad={() => setLoadedTwo(true)}
        />

        <CardMedia
          component="img"
          sx={StyledCardCarosuel}
          title="img"
          alt="img"
          image={selectImage}
          onLoad={(event) => {
            setLoaded(true);
            handleImageLoad(event);
          }}
        />
        <CardMedia
          component="img"
          sx={StyledCardCarouselSecondary("right")}
          title="img"
          alt="img"
          image={selectImageOther}
          onLoad={() => setLoadedTwo(true)}
        />
        <KeyboardArrowLeft
          onClick={previous}
          fontSize="large"
          sx={StyledArrow("left")}
        />
        <KeyboardArrowRight
          onClick={next}
          fontSize="large"
          sx={StyledArrow("right")}
        />
      </Box>
      <Box sx={StyledContainerCarousel(true)}>
        {imgCarousel.length > 0
          ? imgCarousel.map((_, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "fit-content",
                    height: "66px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HorizontalRule
                    onClick={() => {
                      index != selectIndex ? selectButtonItem(index) : null;
                    }}
                    sx={{
                      fontSize: index === selectIndex ? "66px" : "35px",
                      color: index === selectIndex ? "#C02327" : "#414141 ",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
}
function StyledContainer() {
  return {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    gap: { xs: "10px", md: "30px", lg: "60px", xl: "100px" },
    my: { xs: "20px", md: "30px", lg: "15px" },
  };
}
export default function CarouselFullWidth() {
  const { CarouselInit } = useBoundStore((state) => state, shallow);
  return (
    <Box sx={StyledContainer}>
      <BoxTypography />
      <Carousel img={CarouselInit} />
    </Box>
  );
}
