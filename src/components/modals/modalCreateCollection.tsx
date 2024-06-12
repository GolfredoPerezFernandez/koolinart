import { useState, useContext, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
  CircularProgress,
  Modal,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/store/index";
import { useFormik } from "formik";
import { CreateCollectionValidation } from "@/schemas-validation";
import { shallow } from "zustand/shallow";
import { CreateNftContext } from "@/context/CreateNft/CreateNftContext";

import imageCompression from "browser-image-compression";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
import ButtonModal from "@/components/buttons/buttonModal";

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
function StyledTypography() {
  return {
    color: "text.secondary",
  };
}
function StyledContainerForm() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
  };
}
function StyledContentUpload() {
  return {
    outline: "2px dashed",
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "100%",
      xl: "100%",
    },
    height: { xs: "150px", md: "220px", lg: "200px" },
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    my: "10px",
  };
}
const CustomTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "15px 12px",
  borderRadius: "10px",
  border: "2px solid",
  borderColor: (theme.palette.common as any).two,
  ".MuiInputBase-input": {
    color: (theme.palette.text as any).tertiary,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
  },
}));
export default function ModalCreateCollection() {
  const {
    CollectionCreateNft,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
    UserRender,
    ChangeCollectionCreateNft,
  } = useBoundStore((state: any) => state, shallow);
  const { CreateCollection }: any = useContext(CreateNftContext);
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const inputFile = useRef<HTMLInputElement>(null);

  const handleClose = () => setOpen(false);

  function validateCreateColletions(UserRender: any) {
    UserRender.length == 0
      ? (navigate(`/sign-in`),
        ChangeTypeAlert(`info`),
        ChangeTitleAlert("Please register or login"),
        ChangeStateAlert(true))
      : setOpen(true);
  }

  const changeCollection = async (event: any) => {
    const imgIdentification = event.target.files[0];
    if (
      (imgIdentification != undefined &&
        imgIdentification.type === "image/jpeg") ||
      imgIdentification.type === "image/jpg" ||
      imgIdentification.type === "image/png" ||
      imgIdentification.type === "image/GIF" ||
      imgIdentification.type === "image/webp"
    ) {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(
          imgIdentification,
          options
        );
        const preview = URL.createObjectURL(compressedFile);
        ChangeCollectionCreateNft(compressedFile);
        formik.setFieldValue("theFile", compressedFile);
        setImgPreview(preview);
      } catch (error) {
        return error;
      }
    } else {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(`File type not accepted`);
      ChangeStateAlert(true);
    }
  };
  const onImageClickNft = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const formik = useFormik({
    initialValues: {
      theFile: "",
      nameCollection: "",
      symbol: "",
      descriptionCollection: "",
    },
    validationSchema: CreateCollectionValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoader(true);
        await CreateCollection(values);
        ChangeTypeAlert(`success`),
          ChangeTitleAlert("success in creating collectionr"),
          ChangeStateAlert(true);
        setLoader(false);
        resetForm();
      } catch (error: any) {
        setLoader(false);
        ChangeTypeAlert(`error`),
          ChangeTitleAlert(error),
          ChangeStateAlert(true);
      }
    },
  });

  return (
    <Box sx={{ width: "fit-content", height: "fit-content" }}>
      <ButtonModal
        onClick={() => {
          validateCreateColletions(UserRender);
        }}
      >
        CREATE ERC-721 COLLECTION
      </ButtonModal>
      <Modal
        open={open}
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
          <Typography variant="h2" textAlign="center" sx={StyledTypography}>
            Create Collection
            <Divider
              sx={{
                height: "1px",
                backgroundColor: "common.two",
                width: "70%",
                m: "10px auto",
              }}
            />
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={StyledContainerForm}>
              <FormControl
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Box onClick={onImageClickNft} sx={StyledContentUpload}>
                  <input
                    type="file"
                    name="inputFile"
                    ref={inputFile}
                    onChange={changeCollection}
                    style={{ display: "none" }}
                  />
                  {CollectionCreateNft ? (
                    <CardMedia
                      component="img"
                      image={imgPreview}
                      alt="identification img nft"
                      sx={{
                        borderRadius: 4,
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: { xs: 13, sm: 15, md: 16, lg: 16 },
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                      }}
                    >
                      click to select files <br /> JPG, PNG, GIF, WEBP <br />{" "}
                      Max file size 60mb
                    </Typography>
                  )}
                </Box>
              </FormControl>
              <FormControl sx={{ width: "100%", display: "flex", gap: "10px" }}>
                <Typography variant="subtitle1" textAlign="center">
                  Name Collection
                </Typography>
                <CustomTextField
                  onBlur={formik.handleBlur}
                  id="nameCollection"
                  name="nameCollection"
                  error={
                    formik.touched.nameCollection &&
                    Boolean(formik.errors.nameCollection)
                  }
                  onChange={formik.handleChange}
                  value={formik.values.nameCollection}
                  multiline={false}
                  title="Name Collection"
                  placeholder="Enter collection name"
                />
                {formik.touched.nameCollection && (
                  <FormHelperText error id="nameCollection-error">
                    {formik.errors.nameCollection as string}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ width: "100%", display: "flex", gap: "10px" }}>
                <Typography variant="subtitle1" textAlign="center">
                  Symbol
                </Typography>
                <CustomTextField
                  onBlur={formik.handleBlur}
                  id="symbol"
                  name="symbol"
                  error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                  onChange={formik.handleChange}
                  value={formik.values.symbol}
                  multiline={false}
                  title="Name Collection"
                  placeholder="Enter token collection symbol"
                />
                {formik.touched.symbol && (
                  <FormHelperText error id="symbol-error">
                    {formik.errors.symbol as string}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ width: "100%", display: "flex", gap: "10px" }}>
                <Typography variant="subtitle1" textAlign="center">
                  Description
                </Typography>
                <CustomTextField
                  onBlur={formik.handleBlur}
                  id="descriptionCollection"
                  name="descriptionCollection"
                  error={
                    formik.touched.descriptionCollection &&
                    Boolean(formik.errors.descriptionCollection)
                  }
                  onChange={formik.handleChange}
                  value={formik.values.descriptionCollection}
                  multiline={false}
                  title="Name Collection"
                  placeholder="Some words about your collection"
                />
                {formik.touched.descriptionCollection && (
                  <FormHelperText error id="descriptionCollection-error">
                    {formik.errors.descriptionCollection as string}
                  </FormHelperText>
                )}
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <ButtonPrimary onClick={handleClose} disabled={Loader}>
                  Cancel
                </ButtonPrimary>
                <ButtonPrimary
                  disabled={!(formik.dirty && formik.isValid) || Loader}
                  type="submit"
                >
                  {Loader ? (
                    <CircularProgress
                      sx={{ color: "secondary.main" }}
                      size="25px"
                    />
                  ) : (
                    "Create"
                  )}
                </ButtonPrimary>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
