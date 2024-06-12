import React, { useState } from "react";
import {
  Radio,
  Card,
  CardContent,
  FormControlLabel,
  CircularProgress,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from "@mui/icons-material";

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<CheckBoxOutlined sx={{ color: "#C02327" }} />}
      icon={<CheckBoxOutlineBlankOutlined />}
      {...props}
    />
  );
}

function StyledContainer() {
  return {
    width: { xs: "250px", sm: "210px", lg: "250px", xl: "320px" },
    backgroundColor: "primary.main",
    p: { xs: "20px", lg: "25px", xl: "30px" },
    borderRadius: "40px",
  };
}

export default function CheckFilter() {
  const { ChangePageActivityFilter } = useBoundStore((state) => state, shallow);
  const [Loader, setLoader] = useState(false);
  const [value, setValue] = useState("All");

  const handleChange = (event) => {
    setLoader(true);
    setValue(event.target.value);
    ChangePageActivityFilter(event.target.value);
    setTimeout(() => {
      setLoader(false);
    }, 2500);
  };
  return (
    <Card sx={StyledContainer}>
      <CardContent>
        <Typography
          variant="h2"
          sx={{
            color: "text.secondary",
            width: "fit-content",
            margin: "auto",
          }}
        >
          {Loader ? (
            <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
          ) : (
            "Filters"
          )}
        </Typography>
        <RadioGroup
          defaultValue="All"
          aria-labelledby="customized-radios"
          name="customized-radios"
          value={value}
          onChange={handleChange}
          sx={{ color: "text.secondary" }}
        >
          <FormControlLabel value={"All"} control={<BpRadio />} label="All" />
          <FormControlLabel
            value={"createNft"}
            control={<BpRadio />}
            label="Created"
          />
          <FormControlLabel
            value={"purchased"}
            control={<BpRadio />}
            label="Purchased"
          />
          <FormControlLabel
            value={"re-sold"}
            control={<BpRadio />}
            label="Re-sold"
          />
          <FormControlLabel
            value={"createHighestBid"}
            control={<BpRadio />}
            label="Auctioned"
          />
          <FormControlLabel
            value={"re-auctioned"}
            control={<BpRadio />}
            label="Re-Auctioned"
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
