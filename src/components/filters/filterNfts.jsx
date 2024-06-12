import { useContext, useState } from "react";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import {
  FilterList,
  ExpandMore,
  ArrowForwardIosSharp,
} from "@mui/icons-material";
import {
  Menu,
  Box,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  TextField,
  styled,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { NftsContext } from "@/context/Nfts/NftsContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";

const useStyles = makeStyles({
  box: {
    width: "fit-content",
    "&:hover $filterList": {
      color: "#C02327",
    },
  },
  filterList: {},
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    sx={{
      boxShadow: "15px  20px  30px  0px rgb(0, 0, 0,0.3)",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    height: "fit-content",
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    padding: "20px",
    color: theme.palette.text.secondary,
    boxShadow:
      "10px 20px 30px 0px rgb(0, 0, 0,0.3),-10px 0px 30px 0px rgb(0, 0, 0,0.3)",
    "& .MuiMenu-list": {
      [theme.breakpoints.up("xs")]: {
        width: "100%",
        height: "400px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "550px",
        height: "450px",
      },
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 20,
        color: theme.palette.text.secondary,
      },
    },
    ".css-1b5cnd7-MuiButtonBase-root-MuiMenuItem-root.Mui-focusVisible, .css-13fwlj5-MuiButtonBase-root-MuiMenuItem-root.Mui-focusVisible":
      {
        backgroundColor: "transparent",
      },
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "100%",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharp />} {...props} />
))(({ theme }) => ({
  padding: "10px",
  borderBottom: "1px solid",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CssTextField = styled(TextField)(({ theme }) => ({
  border: "2px solid",
  borderColor: theme.palette.secondary.icon,
  borderRadius: "10px",
  width: "100%",
  ":hover": {
    backgroundColor: "transparent",
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
      backgroundColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      border: "none",
      boxShadow: "none",
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
  },
  "& label.Mui-focused,": {
    color: theme.palette.text.primary,
  },
  "& label": {
    color: theme.palette.text.primary,
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "10px",
  "& .MuiToggleButtonGroup-grouped": {
    width: "100%",
    display: "flex",
    borderRadius: "10px",
    "&:hover": {
      color: "text.secondary",
      backgroundColor: theme.palette.secondary.main,
    },
    "&.Mui-disabled": {
      border: 0,
    },
    "&.MuiToggleButton-root.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
      background: theme.palette.secondary.main,
    },
  },
}));

export default function FilterNfts() {
  const classes = useStyles();
  const {
    FilterCoincidencePageNftCollection,
    FilterPageNftCollectionObj,
    ChangeFilterCoincidencePageNftVariousCategories,
    ChangeFilterPageNftCollectionObj,
    ChangePageNftsFilter,
  } = useBoundStore((state) => state, shallow);
  const { GetPageNftsVarious, GetTotalPageNftsVarious } =
    useContext(NftsContext);
  const { GetFilterCoincidencePageNftsCollections } =
    useContext(InputsSearchContext);
  const [loader, setloader] = useState(false);
  const [valueStatus, setValueStatus] = useState("All");
  const [valueMaxprice, setValueMaxprice] = useState(0);
  const [valueMinprice, setValueMinprice] = useState(0);
  const [ratio, setRatio] = useState("All");
  const [eggs, setEggs] = useState("All");
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setValueStatus(event.target.value);
  };

  const handleChangeMaxPrice = (value) => {
    const regex = /^[0-9]+$/;
    if (value === "" || regex.test(value)) {
      setValueMaxprice(parseInt(value));
    } else {
      setValueMaxprice(0);
    }
  };

  const handleChangeMinPrice = (value) => {
    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      setValueMinprice(parseInt(value));
    } else {
      setValueMinprice(0);
    }
  };

  const handleRatio = (_, newRatio) => {
    setRatio(newRatio);
    setEggs("All");
  };

  const handleEggs = (_, newEggs) => {
    setEggs(newEggs);
    setRatio("All");
  };

  const applyFunc = async (
    status,
    minPrice,
    maxPrice,
    ratioArtworks,
    eggs,
    collectionAddress
  ) => {
    minPrice = isNaN(minPrice) ? 0 : minPrice;
    maxPrice = isNaN(maxPrice) ? 0 : maxPrice;
    let PageNftVariousCategories = {
      status: status,
      minPrice: parseInt(minPrice),
      maxPrice: parseInt(maxPrice),
      ratio: ratioArtworks,
      eggs: eggs,
      collectionsSearch: collectionAddress,
    };
    setloader(true);
    ChangeFilterCoincidencePageNftVariousCategories(PageNftVariousCategories);
    await GetPageNftsVarious(0, PageNftVariousCategories);
    await GetTotalPageNftsVarious(PageNftVariousCategories);
    ChangePageNftsFilter("FilterVarious");
    setloader(false);
  };

  const ResetButtonFunc = () => {
    setValueStatus("All");
    setValueMaxprice(0);
    setValueMinprice(0);
    setRatio("All");
    setEggs("All");
    let PageNftVariousCategories = {
      status: "All",
      minPrice: 0,
      maxPrice: 0,
      ratio: "All",
      eggs: "All",
      collectionsSearch: [],
    };
    ChangeFilterPageNftCollectionObj([]);
    ChangeFilterCoincidencePageNftVariousCategories(PageNftVariousCategories);
  };

  return (
    <>
      <Box className={classes.box}>
        <ButtonPrimary
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          width="fit-content"
          height={"43px"}
        >
          <FilterList
            className={classes.filterList}
            sx={{
              color: "common.white",
            }}
          />
          Filter
        </ButtonPrimary>
      </Box>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography
          variant="h2"
          sx={{
            borderBottom: "1px solid",
            p: "10px",
          }}
        >
          Filters
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Status</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem
              disableRipple
              sx={{
                justifyContent: { xs: "start", sm: "center" },
              }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={valueStatus}
                onChange={handleChange}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                }}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel
                  value="Buynow"
                  control={<Radio />}
                  label="Buy now"
                />
                <FormControlLabel
                  value="Bids"
                  control={<Radio />}
                  label="Autioned"
                />
              </RadioGroup>
            </MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem
              disableRipple
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <CssTextField
                label="Min"
                id="custom-css-outlined-input"
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  max: 100000000,
                  step: 1,
                  min: "0",
                  pattern: "[0-9]*",
                  type: "number",
                }}
                value={isNaN(valueMinprice) ? "" : valueMinprice}
                onChange={(event) => {
                  handleChangeMinPrice(event.target.value);
                }}
              />
              <Typography variant="body1">to</Typography>
              <CssTextField
                label="Max"
                id="custom-css-outlined-input"
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  max: 100000000,
                  step: 1,
                  min: 0,
                  pattern: "[0-9]*",
                  type: "number",
                }}
                value={isNaN(valueMaxprice) ? "" : valueMaxprice}
                onChange={(event) => {
                  handleChangeMaxPrice(event.target.value);
                }}
              />
            </MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ratio</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem
              disableRipple
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={ratio}
                exclusive
                onChange={handleRatio}
                aria-label="text alignment"
                orientation="vertical"
              >
                <ToggleButton
                  value="highRatio"
                  aria-label="left aligned"
                  sx={{ backgroundColor: "secondary.icon" }}
                >
                  <Typography variant="subtitle1" color="background.default">
                    High ratio
                  </Typography>
                </ToggleButton>

                <ToggleButton
                  value="lowRatio"
                  aria-label="right aligned"
                  sx={{ backgroundColor: "secondary.icon" }}
                >
                  <Typography variant="subtitle1" color="background.default">
                    low ratio
                  </Typography>
                </ToggleButton>
              </StyledToggleButtonGroup>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: "10px",
                  }}
                >
                  <StyledToggleButtonGroup
                    size="small"
                    value={eggs}
                    exclusive
                    onChange={handleEggs}
                    orientation="vertical"
                  >
                    <ToggleButton
                      value="CommonEggs"
                      sx={{ backgroundColor: "secondary.icon" }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="background.default"
                      >
                        common
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value="UncommonEggs"
                      sx={{ backgroundColor: "#1e50bd" }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="background.default"
                      >
                        Uncommon
                      </Typography>
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                  <StyledToggleButtonGroup
                    size="small"
                    value={eggs}
                    exclusive
                    onChange={handleEggs}
                    orientation="vertical"
                  >
                    <ToggleButton
                      value="RareEggs"
                      sx={{
                        backgroundColor: "#e022ad",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="background.default"
                      >
                        rare
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      value="LegendaryEggs"
                      sx={{ backgroundColor: "#ffd900" }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="background.default"
                      >
                        Legendary
                      </Typography>
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Box>
                <StyledToggleButtonGroup
                  size="small"
                  value={eggs}
                  exclusive
                  onChange={handleEggs}
                >
                  <ToggleButton
                    value="EasterEgg"
                    sx={{
                      background:
                        "linear-gradient(to left,blue,green,yellow,red)",
                    }}
                  >
                    <Typography variant="subtitle1" color="background.default">
                      EasterEggs
                    </Typography>
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Box>
            </MenuItem>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Colletions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuItem
              disableRipple
              sx={{
                width: "100%",
              }}
            >
              <InputSearchGlobals
                title="Search Collections"
                filterOptions={FilterCoincidencePageNftCollection}
                GetFilterGlobal={GetFilterCoincidencePageNftsCollections}
                goTo={false}
                SetFuction={ChangeFilterPageNftCollectionObj}
              />
            </MenuItem>
          </AccordionDetails>
        </Accordion>
        <MenuItem
          disableRipple
          sx={{
            display: "flex",
            gap: "20px",
            width: "100%",
            padding: "20px",
          }}
        >
          <ButtonPrimary width="100%" onClick={() => ResetButtonFunc()}>
            reset
          </ButtonPrimary>
          <ButtonPrimary
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disabled={valueMinprice > valueMaxprice}
            width="100%"
            onClick={() =>
              applyFunc(
                valueStatus,
                valueMinprice,
                valueMaxprice,
                ratio,
                eggs,
                FilterPageNftCollectionObj
              )
            }
          >
            {loader ? (
              <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
            ) : (
              "apply"
            )}
          </ButtonPrimary>
        </MenuItem>
      </StyledMenu>
    </>
  );
}
