import { useState, useContext } from "react";
import {
  Box,
  Typography,
  Tooltip,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
  InputAdornment,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/store/index";
import { useFormik } from "formik";
import { CreateBids } from "@/schemas-validation";
import { shallow } from "zustand/shallow";
import { MintContext } from "@/context/Mint/MintContext";

import ButtonPrimary from "@/components/buttons/buttonPrimary";

function StyledContainerModal() {
  return {
    position: "fixed",
    transform: "translate(-50%, -50%)",
    right: "50%",
    bottom: "50%",
    top: "50%",
    left: "50%",
    width: { xs: 250, sm: 350, md: 430, lg: 450, xl: 520 },
    height: "fit-content",
    px: { xs: 4, sm: 4, xl: 6 },
    py: { xs: 2, sm: 3, xl: 6 },
    bgcolor: "background.paper",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  };
}
function StyledContainerTypography() {
  return {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  };
}
function StyledTypography() {
  return {
    color: "text.secondary",
  };
}
const CustomTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "15px 12px",
  borderRadius: "10px",
  border: "2px solid",
  borderColor: theme.palette.secondary.main,
  ".MuiInputBase-input": {
    color: (theme.palette.text as any).tertiary,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
  },
}));

export default function ModalBids() {
  const {
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
    UserRender,
    ProfileNft,
    LoginType,
  } = useBoundStore((state: any) => state, shallow);
  const { HandleBidMail, HandleBid }: any = useContext(MintContext);

  let navigate = useNavigate();
  let highestBid = ProfileNft?.highestBid ? ProfileNft.highestBid : 0;
  let name = ProfileNft?.metadataNft?.name;
  let tokenId = ProfileNft?.tokenId
    ? ProfileNft.tokenId
    : ProfileNft?.tokenIdAdmin
    ? ProfileNft.tokenIdAdmin
    : "";
  let nameCollection = ProfileNft?.name;
  let collectionAddress = ProfileNft?.collectionAddress;

  const [openBids, setOpenBids] = useState(false);
  const [Loader, setLoader] = useState(false);

  function validateBids(user: string | any[]) {
    user.length == 0
      ? (navigate(`/sign-in`),
        ChangeTypeAlert(`info`),
        ChangeTitleAlert("Please register or login"),
        ChangeStateAlert(true))
      : setOpenBids(true);
  }
  const handleCloseBids = () => setOpenBids(false);

  const formik = useFormik({
    initialValues: {
      minBids: highestBid,
    },
    validationSchema: CreateBids,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!values.minBids && values.minBids > highestBid) {
          setLoader(true);
          if (LoginType === "email") {
            await HandleBidMail(values.minBids, tokenId, collectionAddress);
            handleCloseBids();
          } else {
            await HandleBid(values.minBids, tokenId, collectionAddress);
            handleCloseBids();
          }
          ChangeTypeAlert(`success`),
            ChangeTitleAlert("auction sent"),
            ChangeStateAlert(true);
          resetForm();
          setLoader(false);
        } else {
          ChangeTypeAlert(`error`),
            ChangeTitleAlert(
              "something happened in the offer, it is void or the price is lower than the offer!"
            ),
            ChangeStateAlert(true);
        }
      } catch (error: any) {
        setLoader(false);
        ChangeTypeAlert(`error`),
          ChangeTitleAlert("auction lower than the highest bid"),
          ChangeStateAlert(true);
        throw error.message;
      }
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <ButtonPrimary
        onClick={() => {
          validateBids(UserRender);
        }}
        width="100%"
      >
        Place a bid
      </ButtonPrimary>
      <Modal
        open={openBids}
        hideBackdrop={false}
        disableEnforceFocus={true}
        disableEscapeKeyDown={true}
        sx={{
          backgroundColor: "transparent",
          backdropFilter: "blur(1px)",
        }}
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <Box sx={StyledContainerModal}>
          <Typography variant="body1" textAlign="center" sx={StyledTypography}>
            You are about to place a bid for
          </Typography>
          <Box sx={StyledContainerTypography}>
            <Tooltip title={name} followCursor>
              <Typography variant="body2" sx={StyledTypography}>
                {name ? name.slice(0, 15) : name}
              </Typography>
            </Tooltip>
            <Tooltip title={tokenId} followCursor>
              <Typography variant="body2" sx={StyledTypography}>
                ID:{tokenId}
              </Typography>
            </Tooltip>
          </Box>
          <Typography variant="body1" textAlign="center" sx={StyledTypography}>
            from
          </Typography>
          <Box sx={StyledContainerTypography}>
            <Typography variant="body1" sx={StyledTypography}>
              Collection:
            </Typography>
            <Tooltip title={nameCollection} followCursor>
              <Typography variant="body2" sx={StyledTypography}>
                {nameCollection ? nameCollection.slice(0, 15) : nameCollection}
              </Typography>
            </Tooltip>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: "100%", display: "flex", gap: "10px" }}>
              <Typography variant="body1" sx={StyledTypography}>
                Your bid
              </Typography>
              <CustomTextField
                onBlur={formik.handleBlur}
                error={formik.touched.minBids && Boolean(formik.errors.minBids)}
                onChange={formik.handleChange}
                value={formik.values.minBids}
                placeholder={`Amount over ${highestBid}`}
                id="minBids"
                name="minBids"
                autoComplete="minBids"
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  max: 10000000000,
                  step: 1,
                  min: highestBid,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.secondary",
                        px: 0.6,
                        fontWeight: "700",
                      }}
                    >
                      KNRT
                    </Typography>
                  </InputAdornment>
                }
              />
              {formik.touched.minBids && (
                <FormHelperText error id="minBids-error">
                  {formik.errors.minBids as string}
                </FormHelperText>
              )}
              <ButtonPrimary width="100%" type="submit" disabled={Loader}>
                {Loader ? (
                  <CircularProgress
                    sx={{ color: "secondary.main" }}
                    size="25px"
                  />
                ) : (
                  "Place a bid"
                )}
              </ButtonPrimary>
              <ButtonPrimary
                width="100%"
                variant="contained"
                onClick={handleCloseBids}
                disabled={Loader}
              >
                {Loader ? (
                  <CircularProgress
                    sx={{ color: "secondary.main" }}
                    size="25px"
                  />
                ) : (
                  "Cancel"
                )}
              </ButtonPrimary>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
