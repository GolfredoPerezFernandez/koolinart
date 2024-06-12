import TabsAccordion from "@/components/accordion/accordion";
import { useBoundStore } from "@/store/index";
import { Box, CardMedia, Typography, styled } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { shallow } from "zustand/shallow";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "75px",
  height: "9px",
  boxShadow: "3px  3px  3px  2px rgb(0, 0, 0,0.3)",
  borderRadius: "10px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.paper,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.up("sm")]: {
    width: "100px", // Width for sm screens and up
  },
  [theme.breakpoints.up("md")]: {
    width: "120px", // Width for sm screens and up
  },
}));

function StyleTitleLinearProgress() {
  return {
    color: "text.secondary",
    textAlign: "center",
    cursor: "default",
    textTransform: "capitalize",
  };
}

function StyleContainerSecondary() {
  return {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  };
}

function StyleContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { xs: "15px", md: "30px" },
  };
}

const CardTraitsNftEggs = (props) => {
  const { ThemeModeState } = useBoundStore((state) => state, shallow);
  let colorTitleAndEgg;
  let typeEggImg;
  switch (props.type) {
    case "CommonEggs":
      colorTitleAndEgg = "#EAE8E8";
      typeEggImg =
        ThemeModeState == "light"
          ? "https://ipfs.moralis.io:2053/ipfs/QmdyU19CitPouwdz3YtbUdPyt5HFUbuzxjcWA69gFuQYs4/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_common_light.svg"
          : "https://ipfs.moralis.io:2053/ipfs/QmTvBNJdf9dKxLHAcnu5ikxU189BSaQQSkJaiH7zahHq8V/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_common.svg";

      break;
    case "UncommonEggs":
      colorTitleAndEgg = "#1e50bd";
      typeEggImg =
        "https://ipfs.moralis.io:2053/ipfs/QmWgDv8kMoEGsbb2FQh9hfZqZ6xkxnuk8f5HxTQMh9ALUD/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_uncommon.svg";
      break;
    case "RareEggs":
      colorTitleAndEgg = "#e022ad";
      typeEggImg =
        "https://ipfs.moralis.io:2053/ipfs/QmVke7sKVRdD4m68kefxMzcoq21dsS3c95DprqWwJJbKKh/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_rare.svg";
      break;
    case "LegendaryEggs":
      colorTitleAndEgg = "#ffd900";
      typeEggImg =
        "https://ipfs.moralis.io:2053/ipfs/QmQhW9zkCHt8U5uycqLaA7qzwyCb7wxbArT1p3vvbAC6mc/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_legendary.svg";
      break;
    case "EasterEgg":
      typeEggImg =
        "https://ipfs.moralis.io:2053/ipfs/QmPbi4ZAAwyHSqKQx2XRevgdJeDJkk4ro18PGVJz5X2pSK/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_easter.svg";
      break;
    default:
      colorTitleAndEgg = "#EAE8E8";
      typeEggImg =
        ThemeModeState == "light"
          ? "https://ipfs.moralis.io:2053/ipfs/QmdyU19CitPouwdz3YtbUdPyt5HFUbuzxjcWA69gFuQYs4/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_common_light.svg"
          : "https://ipfs.moralis.io:2053/ipfs/QmTvBNJdf9dKxLHAcnu5ikxU189BSaQQSkJaiH7zahHq8V/0xE568887Bf75AeA78147730CC4101aDf09626759E/egg_common.svg";

      break;
  }
  function StyleContainer() {
    return {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "fit-content",
      alignItems: "center",
    };
  }
  function StyleTypography(Type) {
    let styledType =
      Type === "EasterEgg"
        ? {
            background:
              "-webkit-linear-gradient(#fd004c,#fe9000,#fff020,#3edf4b,#3363ff,#b102b7,#fd004c)",
            WebkitTextStroke: "1px black",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            cursor: "default",
            textTransform: "capitalize",
          }
        : {
            color: colorTitleAndEgg,
            WebkitTextStroke: "1px black",
            textAlign: "center",
            cursor: "default",
            textTransform: "capitalize",
          };
    return styledType;
  }

  return (
    <Box sx={StyleContainer}>
      <CardMedia
        component="img"
        image={typeEggImg ? typeEggImg : null}
        alt="type Egg NFT"
        sx={{
          width: "fit-content",
        }}
      />
      {props.type == "EasterEgg" ? (
        <Typography variant="h2" sx={StyleTypography(props.type)}>
          {props.type}
        </Typography>
      ) : (
        <Typography variant="h2" sx={StyleTypography(props.type)}>
          {props.type}
        </Typography>
      )}
    </Box>
  );
};
const CardTraitsNft = (props) => {
  let valueConvert = Number(props.value);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: "200px", md: "200px" },
      }}
    >
      <Typography variant="h2" sx={StyleTitleLinearProgress}>
        {props.tittle.slice(0, 14)}
      </Typography>
      <Typography variant="subtitle1" sx={StyleTitleLinearProgress}>
        {valueConvert} %
      </Typography>
      <BorderLinearProgress variant="determinate" value={valueConvert} />
    </Box>
  );
};

export default function TabsTraits() {
  const { energy, force, impact, sustainability, rarity, value, type } =
    useBoundStore(
      (state) => ({
        energy: state.ProfileNft?.metadataNft?.energy,
        force: state.ProfileNft?.metadataNft?.force,
        impact: state.ProfileNft?.metadataNft?.impact,
        sustainability: state.ProfileNft?.metadataNft?.sustainability,
        rarity: state.ProfileNft?.metadataNft?.rarity,
        value: state.ProfileNft?.metadataNft?.value,
        type: state.ProfileNft?.metadataNft?.type,
      }),
      shallow
    );

  return (
    <TabsAccordion tittle="Traits" expand={true}>
      <Box sx={StyleContainer}>
        <Box sx={StyleContainerSecondary}>
          <CardTraitsNft tittle="Energy" value={energy} />
          <CardTraitsNft tittle="Force" value={force} />
        </Box>
        <Box sx={StyleContainerSecondary}>
          <CardTraitsNft tittle="Energy" value={energy} />
          <CardTraitsNft tittle="Force" value={force} />
        </Box>
        <Box sx={StyleContainerSecondary}>
          <CardTraitsNft tittle="Value" value={value} />
          <CardTraitsNft tittle="Impact" value={impact} />
        </Box>
        <Box sx={StyleContainerSecondary}>
          <CardTraitsNft tittle="Sustainability" value={sustainability} />
          <CardTraitsNft tittle="Rarity" value={rarity} />
        </Box>
        <CardTraitsNftEggs type={type} />
      </Box>
    </TabsAccordion>
  );
}
