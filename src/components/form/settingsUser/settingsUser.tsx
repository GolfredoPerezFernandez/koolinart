import { useState, useRef, useContext } from "react";
import {
  Typography,
  Box,
  CardMedia,
  CircularProgress,
  FormControl,
  InputBase,
  styled,
} from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { useFormik } from "formik";
import { SettingsValidation } from "@/schemas-validation";
import { UserContext } from "@/context/User/UserContext";
import { TaskAltOutlined } from "@mui/icons-material";

import ButtonPrimary from "@/components/buttons/buttonPrimary";
import imageCompression from "browser-image-compression";

function StyledContentUploadAvatar() {
  return {
    outline: "2px dashed",
    width: {
      xs: "100%",
      sm: "250px",
      md: "250px",
      lg: "250px",
      xl: "280px",
    },
    height: "200px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
  };
}
function StyledContentUploadBanner() {
  return {
    outline: "2px dashed",
    width: {
      xs: "100%",
      sm: "250px",
      md: "250px",
      lg: "400px",
      xl: "280px",
    },
    height: "200px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
  };
}
function StyledContainerUpload() {
  return {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    justifyContent: { xs: "center", md: "space-between" },
    rowGap: "30px",
    alignItems: "center",
  };
}
function StyledForm() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  };
}
function StyledContainer() {
  return {
    borderRadius: "10px",
    border: "2px solid #00d12a",
    padding: "10px",
    color: "text.secondary",
    backgroundColor: "background.paper",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };
}
const CustomTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "15px 12px",
  borderRadius: "10px",
  opacity: "0.8",
  ".MuiInputBase-input": {
    color: (theme.palette.text as any).tertiary,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.subtitle1.fontWeight,
  },
}));

export default function FormSettingsUser() {
  const { SetSettingsUser, verifiedPasswordFunc }: any =
    useContext(UserContext);
  const { UserRender, ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } =
    useBoundStore((state: any) => state, shallow);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const inputFileAvatar = useRef<HTMLInputElement>(null);
  const inputFilebanner = useRef<HTMLInputElement>(null);

  const emailVerified = UserRender.attributes?.emailVerified
    ? UserRender?.attributes?.emailVerified
    : false;

  const userEmail = UserRender.attributes?.email
    ? UserRender?.attributes?.email
    : "";

  const SendVerifiedPassword = async (value: any) => {
    try {
      await verifiedPasswordFunc(value);
      ChangeTypeAlert(`success`);
      ChangeTitleAlert("Send verifies email");
      ChangeStateAlert(true);
    } catch (error: any) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error.message);
      ChangeStateAlert(true);
    }
  };
  const changeHandlerAvatar = async (event: any) => {
    const ImgAvatar = event.target.files[0];
    if (
      (ImgAvatar != undefined && ImgAvatar.type === "image/jpeg") ||
      ImgAvatar.type === "image/jpg" ||
      ImgAvatar.type === "image/png" ||
      ImgAvatar.type === "image/GIF" ||
      ImgAvatar.type === "image/webp"
    ) {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(ImgAvatar, options);
        formik.setFieldValue("userAvatar", compressedFile);
        setAvatar(URL.createObjectURL(compressedFile));
      } catch (error) {
        return error;
      }
    } else {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(`File type not accepted`);
      ChangeStateAlert(true);
    }
  };
  const changeHandlerBanner = async (event: any) => {
    const imgBanner = event.target.files[0];
    if (
      (imgBanner != undefined && imgBanner.type === "image/jpeg") ||
      imgBanner.type === "image/jpg" ||
      imgBanner.type === "image/png" ||
      imgBanner.type === "image/GIF" ||
      imgBanner.type === "image/webp"
    ) {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imgBanner, options);
        const preview = URL.createObjectURL(compressedFile);
        formik.setFieldValue("userBanner", compressedFile);
        setBanner(preview);
      } catch (error) {
        return error;
      }
    } else {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(`File type not accepted`);
      ChangeStateAlert(true);
    }
  };
  const onImageClickAvatar = () => {
    inputFileAvatar?.current?.click();
  };
  const onImageClickBanner = () => {
    inputFilebanner?.current?.click();
  };
  const formik = useFormik({
    initialValues: {
      userAvatar: "",
      userBanner: "",
      fullname: UserRender?.attributes?.fullname
        ? UserRender.attributes.fullname
        : "",
      username: UserRender?.attributes?.username
        ? UserRender.attributes.username
        : "",
      email: UserRender?.attributes?.email ? UserRender.attributes.email : "",
      biography: UserRender?.attributes?.biography
        ? UserRender.attributes.biography
        : "",
    },
    validationSchema: SettingsValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await SetSettingsUser(values);
        setLoading(false);
        ChangeTypeAlert(`success`);
        ChangeTitleAlert("finished the settings process");
        ChangeStateAlert(true);
      } catch (error) {
        setLoading(false);
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={StyledForm}>
        <Typography
          variant="h2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          My Settings
        </Typography>
        <Box sx={StyledContainerUpload}>
          <Box onClick={onImageClickAvatar} sx={StyledContentUploadAvatar}>
            <input
              type="file"
              name="FileAvatar"
              ref={inputFileAvatar}
              onChange={changeHandlerAvatar}
              style={{ display: "none" }}
            />
            {avatar ? (
              <CardMedia
                component="img"
                image={avatar}
                alt="identification img nft"
                sx={{
                  borderRadius: "30px",
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
                click to select Avatar file JPG, PNG or GIF Max file size 20mb
              </Typography>
            )}
          </Box>
          <Box onClick={onImageClickBanner} sx={StyledContentUploadBanner}>
            <input
              type="file"
              name="Filebanner"
              ref={inputFilebanner}
              onChange={changeHandlerBanner}
              style={{ display: "none" }}
            />
            {banner ? (
              <CardMedia
                component="img"
                image={banner}
                alt="identification img nft"
                sx={{
                  borderRadius: "30px",
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
                click to select Banner file JPG, PNG or GIF Max file size 20mb
              </Typography>
            )}
          </Box>
        </Box>
        <FormControl>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Full Name
          </Typography>
          <CustomTextField
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            onChange={formik.handleChange}
            value={formik.values.fullname}
            placeholder="My full name"
            id="fullname"
            name="fullname"
            autoComplete="fullname"
          />
          {formik.touched.fullname && (
            <Typography variant="subtitle2">
              {formik.errors.fullname?.toString() ?? ""}
            </Typography>
          )}
        </FormControl>
        <FormControl>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Username
          </Typography>
          <CustomTextField
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="example.StevenJonbs"
            id="username"
            name="username"
            autoComplete="username"
          />
          {formik.touched.username && (
            <Typography variant="subtitle2">
              {formik.errors.username?.toString() ?? ""}
            </Typography>
          )}
        </FormControl>
        <FormControl>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Email
          </Typography>
          <CustomTextField
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Example@gmail.com"
            id="email"
            name="email"
            autoComplete="email"
          />
          {formik.touched.email && (
            <Typography variant="subtitle2">
              {formik.errors.email?.toString() ?? ""}
            </Typography>
          )}
        </FormControl>
        {userEmail ? (
          emailVerified ? (
            <Box sx={StyledContainer}>
              <TaskAltOutlined />
              <Typography variant="body2">Verified email</Typography>
            </Box>
          ) : (
            <ButtonPrimary
              width="100%"
              onClick={() => {
                SendVerifiedPassword(userEmail);
              }}
            >
              Verify email
            </ButtonPrimary>
          )
        ) : null}

        <FormControl>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Biography
          </Typography>
          <CustomTextField
            onBlur={formik.handleBlur}
            error={formik.touched.biography && Boolean(formik.errors.biography)}
            onChange={formik.handleChange}
            value={formik.values.biography}
            placeholder="biography"
            id="biography"
            name="biography"
            autoComplete="biography"
          />
          {formik.touched.biography && (
            <Typography variant="subtitle2">
              {formik.errors.biography?.toString() ?? ""}
            </Typography>
          )}
        </FormControl>
        <ButtonPrimary
          width={"100%"}
          height={50}
          disabled={!(formik.dirty && formik.isValid) || UserRender.length == 0}
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
  );
}
