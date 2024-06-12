import React, { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)(({ theme }) => ({
  border: "2px solid",
  borderColor: "#C02327",
  borderRadius: "10px",
  width: "100%",
  padding: "2px 5px",
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
}));
const CustomAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    padding: "2px 10px",
  },
  display: "flex",
  border: "none",
  width: "inherit",
});

export default function InputSearchGlobals(props) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const [loader, setLoader] = useState(false);
  const regex = /^[^x]*x[^x]*$/;
  const goTo = props.goTo;
  let navigate = useNavigate();

  const optionItems = props.filterOptions
    ? props.filterOptions?.map((option) => ({
        id: option?.id,
        label: option?.label,
        optional: option?.optional,
      }))
    : [];

  function Change(Obj) {
    goTo ? navigate(Obj.optional) : props.SetFuction(Obj);
    setLoader(false);
  }

  useEffect(() => {
    const filterFunc = async (inputValue) => {
      setLoader(true);
      inputValue ? await props.GetFilterGlobal(inputValue) : null;
      setLoader(false);
    };
    filterFunc(inputValue);
  }, [inputValue]);

  return (
    <CustomAutocomplete
      id="controllable-states"
      options={optionItems}
      value={value}
      inputValue={inputValue}
      onInputChange={(_, newValue) => {
        setInputValue(newValue);
      }}
      onChange={(_, value) => {
        setValue(value);
        Change(value);
      }}
      isOptionEqualToValue={(option, value) => {
        if (!value) return false;
        if (option.value === "") return false;
        return option.value === value.value;
      }}
      renderInput={(params) => (
        <CssTextField
          placeholder={props.title}
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search
                  sx={{
                    color: "secondary.icon",
                    fontSize: { xs: "20px", md: "25px" },
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {loader ? (
                  <CircularProgress
                    sx={{ color: "secondary.main" }}
                    size="25px"
                  />
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          {...props}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          key={option.id}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "600",
              color: "text.primary",
              textAlign: "center",
            }}
          >
            ID:
            {regex.test(option?.id)
              ? `${option?.id?.slice(0, 6)}...${option?.id?.slice(-4)}`
              : option?.id}
            {}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "600",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Name: {option?.label?.slice(0, 15)}
          </Typography>
        </Box>
      )}
    />
  );
}
