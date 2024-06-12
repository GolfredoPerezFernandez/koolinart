import { Card, CardContent, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

function StyledCard(type) {
  let valueStyled;
  let typeBorder;
  switch (type) {
    case "CommonEggs":
      valueStyled = "backgroundColor";
      typeBorder = "secondary.icon";
      break;
    case "UncommonEggs":
      valueStyled = "background";
      typeBorder = "#1e50bd";
      break;
    case "RareEggs":
      valueStyled = "background";
      typeBorder = "#e022ad";
      break;
    case "LegendaryEggs":
      valueStyled = "background";
      typeBorder = "#ffd900";
      break;
    case "EasterEgg":
      valueStyled = "background";
      typeBorder =
        "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)";
      break;
    default:
      valueStyled = "backgroundColor";
      typeBorder = "secondary.icon";
      break;
  }
  return {
    [valueStyled]: typeBorder,
    p: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "250px", sm: "360px", md: "550px", lg: "750px", xl: "980px" },
    height: { xs: "250px", sm: "400px", md: "550px", lg: "600px" },
    borderRadius: "45px",
    transition: "0.3s",
    "&:hover": {
      p: "5.5px",
      mt: "-10px",
      animation: type == "EasterEgg" ? "spin 0.7s infinite linear" : null,
    },
    "@keyframes spin": {
      "0%": {
        background:
          "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
      },
      "14%": {
        background:
          "conic-gradient(#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c)",
      },
      "28%": {
        background:
          "conic-gradient(#fff020,#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000)",
      },
      "42%": {
        background:
          "conic-gradient(#3edf4b,#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020)",
      },
      "56%": {
        background:
          "conic-gradient(#3363ff,#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b)",
      },
      "70%": {
        background:
          "conic-gradient(#b102b7,#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff)",
      },
      "84%": {
        background:
          "conic-gradient(#fd004c,#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7)",
      },
      "100%": {
        background:
          "conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
      },
    },
  };
}
function StyledCardContent() {
  return {
    height: "calc(100% - 10px)",
    width: "calc(100% - 10px)",
  };
}
function StyledCardMedia() {
  return {
    borderRadius: "37px",
    height: "100%",
    width: "100%",
  };
}
function StyledCardMediaGhost() {
  return {
    borderRadius: "37px",
    height: { xs: "250px", md: "600px" },
    objectFit: "contain",
  };
}
export default function ImageNft(props) {
  const { type, imageIdentification, ThemeModeState } = useBoundStore(
    (state) => ({
      type: state.ProfileNft?.metadataNft?.type,
      imageIdentification: state.ProfileNft?.metadataNft?.imageIdentification,
      ThemeModeState: state.ThemeModeState,
    }),
    shallow
  );
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  return imageIdentification ? (
    <Card sx={StyledCard(type)}>
      <CardContent sx={StyledCardContent}>
        <CardMedia
          component="img"
          image={imageIdentification ? imageIdentification : ghost_koolinart}
          sx={StyledCardMedia}
        />
      </CardContent>
    </Card>
  ) : (
    <CardMedia
      component="img"
      image={ghost_koolinart}
      sx={StyledCardMediaGhost}
    />
  );
}
