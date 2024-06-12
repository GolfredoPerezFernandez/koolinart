import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Switch,
  styled,
  InputBase,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { CreateNftValidation } from "@/schemas-validation";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { GppMaybe } from "@mui/icons-material";
import { MintContext } from "@/context/Mint/MintContext";
import { useNavigate } from "react-router-dom";
import SelectTypeCreateNft from "@/components/form/createNft/selectTypeCreateNft";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import ImgUpload from "@/components/form/createNft/imgUpload";
import SelectCollectionSlider from "@/components/form/createNft/SelectCollectionSlider";

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

export default function PutOnSale() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { MintNft }: any = useContext(MintContext);
  const {
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
    UserRender,
    ChangePreviewNftName,
  } = useBoundStore((state: any) => state, shallow);
  let navigate = useNavigate();

  const handleChange = () => {
    setChecked(!checked);
    console.log(`checked ${checked}`);
    if (!checked) {
      formik.setFieldValue("marketType", "fixed");
    } else {
      formik.setFieldValue("marketType", "noSale");
    }
  };
  // Custom onChange handler for name field
  const handleNameChange = (event: any) => {
    formik.handleChange(event);
    ChangePreviewNftName(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      identificationImgNft: "",
      NftData: "",
      typeFile: "",
      marketType: "noSale",
      nameNftField: "",
      descriptionNft: "",
      minimumBid: 0,
      price: 0,
    },
    validationSchema: CreateNftValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        console.log(`values ${JSON.stringify(values)}`);
        const res = await MintNft(values);
        setLoading(false);
        ChangeTypeAlert(`success`);
        ChangeTitleAlert("finished the creation process");
        ChangeStateAlert(true);
        setTimeout(() => {
          navigate("/profile-nft" + "/" + res[1] + "/" + res[0], {
            replace: true,
          });
        }, 3000);
        resetForm();
      } catch (error: any) {
        setLoading(false);
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error.message);
        ChangeStateAlert(true);
      }
    },
  });

  return (
    <>
      <ImgUpload
        title="Identification Img NFT"
        subTitle="Upload File"
        onChangeImgIdentification={(value: any) =>
          formik.setFieldValue("identificationImgNft", value)
        }
        onChangeNftData={(value: any) => formik.setFieldValue("NftData", value)}
        onChangetypeFile={(value: any) =>
          formik.setFieldValue("typeFile", value)
        }
      />
      <Typography
        variant="h2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        Create a New Collection or Select one
      </Typography>
      <SelectCollectionSlider />
      <Box sx={{ display: "flex", gap: "30px", flexDirection: "column" }}>
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
            helperMinimum={
              formik.touched.minimumBid && formik.errors.minimumBid
            }
            helperMinimumError={formik.errors.minimumBid}
            onChangeMinimumBid={(value: any) =>
              formik.setFieldValue("minimumBid", value)
            }
            valueMinimumBid={formik.values.minimumBid}
            onChangemarketType={(value: any) =>
              formik.setFieldValue("marketType", value)
            }
          />
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              textAlign="start"
              sx={{ color: "text.secondary" }}
            >
              Name
            </Typography>
            <CustomTextField
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameNftField &&
                Boolean(formik.errors.nameNftField)
              }
              onChange={handleNameChange}
              value={formik.values.nameNftField}
              placeholder="Name"
              id="nameNftField"
              name="nameNftField"
              autoComplete="nameNftField"
            />
            {formik.touched.nameNftField && (
              <FormHelperText error id="nameNftField-error">
                {formik.errors.nameNftField}
              </FormHelperText>
            )}
            <Typography
              variant="subtitle1"
              textAlign="start"
              sx={{ color: "text.secondary" }}
            >
              Description
            </Typography>
            <CustomTextField
              onBlur={formik.handleBlur}
              error={
                formik.touched.descriptionNft &&
                Boolean(formik.errors.descriptionNft)
              }
              onChange={formik.handleChange}
              value={formik.values.descriptionNft}
              placeholder="Description"
              id="descriptionNft"
              name="descriptionNft"
              autoComplete="descriptionNft"
            />
            {formik.touched.descriptionNft && (
              <FormHelperText error id="descriptionNft-error">
                {formik.errors.descriptionNft}
              </FormHelperText>
            )}
            <Box
              sx={{
                borderRadius: "15px",
                outline: "2px solid #C02327",
                p: { xs: "20px", md: "50px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GppMaybe
                sx={{
                  color: "secondary.main",
                  fontSize: {
                    xs: "60px",
                    sm: "80px",
                    md: "100px",
                    lg: "110px",
                    xl: "140px",
                  },
                  flex: 0.5,
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", flex: 1, textAlign: "center" }}
              >
                Once the nft has been mined, the 6 fields of strength, impact,
                sustainability, value and rarity that define its type will be
                randomly generated (CommonEggs, UncommonEggs, RareEggs,
                LegendaryEggs and EasterEggs).
              </Typography>
            </Box>
            <ButtonPrimary
              width={"100%"}
              height={50}
              disabled={
                !(formik.dirty && formik.isValid) ||
                UserRender.length == 0 ||
                (checked === true && formik.values.price <= 0)
              }
              type="submit"
            >
              {loading ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "CREATE NFT"
              )}
            </ButtonPrimary>
          </Box>
        </form>
      </Box>
    </>
  );
}
