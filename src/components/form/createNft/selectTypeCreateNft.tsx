import { useContext, useEffect, useState } from "react";
import {
  Box,
  styled,
  InputBase,
  FormHelperText,
  Typography,
} from "@mui/material";
import {
  TabUnstyled,
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  buttonUnstyledClasses,
} from "@mui/base";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { LocalOfferOutlined, AllInclusiveOutlined } from "@mui/icons-material";

const Tab = styled(TabUnstyled)`
  color: #c02327;
  cursor: pointer;
  font-size: 0.875rem;
  outline: 1px solid #c02327;
  border: none;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  &:hover {
    border-color: #ffffff;
  }
  &:focus {
    color: ;
    outline: 0.5px solid #ffffff;
    border-radius: 14px;
  }
  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
  width: 100%;
  background-color: transparent;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const CustomTextField = styled(InputBase)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  padding: "15px 12px",
  borderRadius: "10px",
  outline: "2px solid #C02327",
  opacity: "0.8",
  ".MuiInputBase-input": {
    color: (theme.palette.text as any).tertiary,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
  },
}));

function StyledTab() {
  return {
    padding: {
      xs: "8px 10px",
      sm: "12px",
      md: "10px 15px",
      lg: "18px 20px",
    },
    width: { xs: "90px", sm: "100px", md: "130px", lg: "150px" },
    height: { xs: "90px", sm: "100px", md: "130px", lg: "150px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    outline: "1px solid",
    opacity: "0.7",
    outlineColor: "text.secondary",
    color: "text.secondary",
    transitions: "0.6s",
    "&.Mui-selected": {
      color: "text.primary",
      outline: "2px solid #C02327",
      backgroundColor: "transparent",
      opacity: "1",
    },
  };
}

function StyledTabList() {
  return {
    display: "flex",
    gap: "10px",
  };
}

export default function selectTypeCreateNft(props: any) {
  const { ChangePreviewNftPrice, ChangePreviewNftBids } = useBoundStore(
    (state: any) => state,
    shallow
  );
  var newValueBids;
  const [stateErrorMinimumBid, setStateErrorMinimumBid] = useState(false);

  function onChangeTypeNftMarket(_: unknown, value: any) {
    let type = value == 0 ? "fixed" : "bids";
    if (type === "fixed") {
      props.onChangemarketType("fixed");
    } else if (type === "bids") {
      props.onChangemarketType("bids");
    }
  }
  const verifyBidsPercentage = (bids: any, price: any) => {
    newValueBids = Math.floor((price * 80) / 100);
    if (
      bids <= newValueBids ||
      bids == undefined ||
      bids == "" ||
      bids == false
    ) {
      setStateErrorMinimumBid(false);
    } else {
      setStateErrorMinimumBid(true);
    }
  };
  const corverntBidsPercentage = (price: any) => {
    newValueBids = Math.floor((price * 80) / 100);
    props.onChangeMinimumBid(newValueBids);
  };
  useEffect(() => {}, [stateErrorMinimumBid]);
  return (
    <Box>
      <TabsUnstyled defaultValue={0} onChange={onChangeTypeNftMarket}>
        <TabsList sx={StyledTabList}>
          <Tab sx={StyledTab}>
            <LocalOfferOutlined />
            Fixed <br /> Price
          </Tab>
          <Tab sx={StyledTab}>
            <AllInclusiveOutlined />
            Open for <br /> bids
          </Tab>
        </TabsList>
        <TabPanel
          value={0}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography
            variant="subtitle1"
            textAlign="start"
            sx={{ color: "text.secondary" }}
          >
            Price
          </Typography>
          <CustomTextField
            type="number"
            inputProps={{
              inputMode: "numeric",
              max: 100000000,
              step: 1,
              min: 0,
              pattern: "[0-9]*",
              type: "number",
            }}
            onBlur={props.onBlurPrice}
            id="price"
            name="price"
            error={props.errorPrice}
            onChange={(e: any) => {
              props.onChangePrice(e.target.value);
              ChangePreviewNftPrice(e.target.value);
            }}
            value={props.valuePrice}
            title="Price"
            placeholder="Enter price for one piece in KNRT"
          />
        </TabPanel>
        <TabPanel
          value={1}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Typography
            variant="subtitle1"
            textAlign="start"
            sx={{ color: "text.secondary" }}
          >
            Buy now Price
          </Typography>
          <CustomTextField
            value={props.valuePrice}
            type="number"
            inputProps={{
              inputMode: "numeric",
              max: 100000000,
              step: 1,
              min: 0,
              pattern: "[0-9]*",
              type: "number",
            }}
            onBlur={props.onBlurPrice}
            id="price"
            name="price"
            error={props.errorPrice}
            onChange={(event: any) => {
              corverntBidsPercentage(event.target.value);
              props.onChangePrice(event.target.value);
              ChangePreviewNftPrice(event.target.value);
            }}
            title="Buy now Price"
            placeholder="Enter buy price in KNRT"
          />
          {props.helperPrice && (
            <FormHelperText error id="username-error">
              {props.helperPriceError}
            </FormHelperText>
          )}
          <Typography
            variant="subtitle1"
            textAlign="start"
            sx={{ color: "text.secondary" }}
          >
            Minimum bid
          </Typography>
          <CustomTextField
            onBlur={props.onBlurMinimumBid}
            id="minimumBid"
            name="minimumBid"
            error={stateErrorMinimumBid}
            onChange={(event: any) => {
              verifyBidsPercentage(event.target.value, props.valuePrice);
              props.onChangeMinimumBid(event.target.value);
              ChangePreviewNftBids(event.target.value);
            }}
            value={props.valueMinimumBid}
            title="Minimum bid"
            placeholder="Enter minimum bid in KNRT"
            type="number"
            inputProps={{
              inputMode: "numeric",
              max: 100000000,
              step: 1,
              min: 0,
              pattern: "[0-9]*",
              type: "number",
            }}
          />
          {props.helperMinimum && (
            <FormHelperText error id="username-error">
              {props.helperMinimumError}
            </FormHelperText>
          )}
          <FormHelperText
            id="component-helper-text"
            sx={{
              color: "text.secondary",
              my: 0.5,
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            offers must be equal to or greater than 80% of the total price
          </FormHelperText>
        </TabPanel>
      </TabsUnstyled>
    </Box>
  );
}
