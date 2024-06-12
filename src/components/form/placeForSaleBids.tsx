import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Switch,
  styled,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { PlaceForSaleBIdsValidation } from "@/schemas-validation";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { MintContext } from "@/context/Mint/MintContext";
import { useNavigate } from "react-router-dom";
import SelectTypeCreateNft from "@/components/form/createNft/selectTypeCreateNft";
import ButtonPrimary from "@/components/buttons/buttonPrimary";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  outline: "3px solid #C02327",
  borderRadius: "10px",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#C02327",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "transparent" : "transparent",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function PlaceForSaleBids() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { MintNft }: any = useContext(MintContext);
  const { ChangeTypeAlert, ChangeTitleAlert, ChangeStateAlert, UserRender } =
    useBoundStore((state: any) => state, shallow);
  let navigate = useNavigate();

  const handleChange = () => {
    setChecked(!checked);
  };

  const formik = useFormik({
    initialValues: {
      marketType: "",
      minimumBid: 0,
      price: 0,
    },
    validationSchema: PlaceForSaleBIdsValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await MintNft(values);
        setLoading(false);
        ChangeTypeAlert(`succes`);
        ChangeTitleAlert("finished the creation process");
        ChangeStateAlert(true);
        setTimeout(() => {
          navigate("/perfil-nft" + "/" + res[1] + "/" + res[0], {
            replace: true,
          });
        }, 3000);
        resetForm();
      } catch (error) {
        setLoading(false);
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    },
  });

  return (
    <Box
      sx={{ display: "flex", gap: "30px", flexDirection: "column", p: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {checked ? (
          <Typography variant="h2" sx={{ color: "text.secondary" }}>
            Put on Sale: activated
          </Typography>
        ) : (
          <Typography variant="h2" sx={{ color: "text.secondary" }}>
            Put on Sale: disabled
          </Typography>
        )}
        <AntSwitch checked={checked} onChange={handleChange} />
      </Box>
      {checked ? (
        <SelectTypeCreateNft
          onBlurPrice={formik.handleBlur}
          errorPrice={formik.touched.price && Boolean(formik.errors.price)}
          helperPrice={formik.touched.price && formik.errors.price}
          helperPriceError={formik.errors.price}
          onChangePrice={(value: any) => formik.setFieldValue("price", value)}
          valuePrice={formik.values.price}
          onBlurMinimumBid={formik.handleBlur}
          errorMinimumBid={
            formik.touched.minimumBid && Boolean(formik.errors.minimumBid)
          }
          helperMinimum={formik.touched.minimumBid && formik.errors.minimumBid}
          helperMinimumError={formik.errors.minimumBid}
          onChangeMinimumBid={(value: any) =>
            formik.setFieldValue("minimumBid", value)
          }
          valueMinimumBid={formik.values.minimumBid}
        />
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <ButtonPrimary
            width={"100%"}
            disabled={
              !(formik.dirty && formik.isValid) || UserRender.length == 0
            }
            type="submit"
          >
            {loading ? (
              <CircularProgress sx={{ color: "secondary.main" }} size="25px" />
            ) : (
              "Confirm"
            )}
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
}
