import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignInValidation } from "@/schemas-validation";
import {
  Box,
  styled,
  InputBase,
  FormControl,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Typography,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from "@mui/icons-material";
import { UserContext } from "@/context/User/UserContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import ButtonPrimary from "@/components/buttons/buttonPrimary";

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
function StyledContainer() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
}
function StyledCard() {
  return {
    my: "10px",
    p: { xs: "20px 30px", md: "30px 35px", lg: "40px 40px" },
    backgroundColor: "background.default",
    borderRadius: "30px",
    width: { xs: "auto", sm: "380px", md: "450px", lg: "450px", xl: "550px" },
    display: "flex",
    justifyContent: "center",
  };
}
function StyledCardContent() {
  return {
    display: "flex",
    flexDirection: "column",
    width: "inherit",
    gap: "20px",
  };
}
function StyledTypography(type: boolean = false) {
  return {
    color: type ? "text.secondary" : "text.primary",
    cursor: "pointer",
    textAlign: "center",
  };
}

export default function FormSignIn() {
  const { LoginMail, LoginMetamask }: any = useContext(UserContext);
  const { ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } = useBoundStore(
    (state: any) => state,
    shallow
  );
  let navigate = useNavigate();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [Loader, setLoader] = useState(false);
  const [LoaderTwo, setLoaderTwo] = useState(false);
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  async function handleLoginMetamask() {
    try {
      setLoader(true);
      await LoginMetamask();
      setLoader(false);
      ChangeTypeAlert(`success`);
      ChangeTitleAlert(`Welcome to Koolinart`);
      ChangeStateAlert(true);
      navigate(`/`);
    } catch (error: any) {
      setLoader(false);
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoaderTwo(true);
        await LoginMail(values);
        navigate(`/`);
        resetForm();
        setLoaderTwo(false);
        ChangeTypeAlert(`success`);
        ChangeTitleAlert(`Welcome to Koolinart`);
        ChangeStateAlert(true);
      } catch (error: any) {
        setLoaderTwo(false);
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    },
  });
  return (
    <Box sx={StyledContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Card sx={StyledCard}>
          <CardContent sx={StyledCardContent}>
            <Typography
              variant="h1"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              Sign In
            </Typography>
            <FormControl>
              <CustomTextField
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
                id="username"
                name="username"
                autoComplete="username"
              />
              {formik.touched.username && (
                <Typography variant="subtitle2">
                  {formik.errors.username}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <CustomTextField
                type={values.showPassword ? "text" : "password"}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: "secondary.icon",
                      }}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && (
                <Typography variant="subtitle2">
                  {formik.errors.password}
                </Typography>
              )}
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  icon={<CheckBoxOutlined sx={{ color: "secondary.icon" }} />}
                  checkedIcon={
                    <CheckBoxOutlineBlankOutlined
                      sx={{ color: "secondary.icon" }}
                    />
                  }
                />
              }
              label="Remember me"
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  sx: { color: "text.secondary" },
                },
              }}
            />
            <ButtonPrimary
              height={true}
              disabled={
                !(formik.dirty && formik.isValid) || LoaderTwo || Loader
              }
              type="submit"
            >
              {LoaderTwo ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "sign in"
              )}
            </ButtonPrimary>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              or
            </Typography>
            <ButtonPrimary
              height={true}
              disabled={Loader || LoaderTwo}
              onClick={() => {
                handleLoginMetamask();
              }}
              width={"100%"}
            >
              {Loader ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "Metamask"
              )}
            </ButtonPrimary>
            <Box
              sx={{ display: "flex", gap: "15px", justifyContent: "center" }}
            >
              <Typography variant="body1" sx={StyledTypography(true)}>
                Don’t have an account yet?
              </Typography>
              <Typography
                variant="body1"
                sx={StyledTypography()}
                onClick={() => {
                  navigate(`/sign-up`);
                }}
              >
                Sign Up
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={StyledTypography()}
              onClick={() => {
                navigate(`/recover-password`);
              }}
            >
              Forgot password?
            </Typography>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
