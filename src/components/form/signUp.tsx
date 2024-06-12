import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpValidation } from "@/schemas-validation";
import {
  Box,
  styled,
  InputBase,
  FormControl,
  InputAdornment,
  IconButton,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

export default function FormSignUp() {
  const { CreateUser }: any = useContext(UserContext);
  const { ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } = useBoundStore(
    (state: any) => state,
    shallow
  );
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [repeatshowPassword, setRepeatshowPassword] = useState(false);
  const [Loader, setLoader] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setRepeatshowPassword(!repeatshowPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: SignUpValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoader(true);
        await CreateUser(values);
        setLoader(false);
        ChangeTypeAlert(`success`);
        ChangeTitleAlert(`Successful creation`);
        ChangeStateAlert(true);
        navigate(`/sign-in`);
        resetForm();
      } catch (error: any) {
        setLoader(false);
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
              Sign Up
            </Typography>
            <FormControl>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Full Name
              </Typography>
              <CustomTextField
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                onChange={formik.handleChange}
                value={formik.values.fullname}
                placeholder="My full name"
                id="fullname"
                name="fullname"
                autoComplete="fullname"
              />
              {formik.touched.fullname && (
                <Typography variant="subtitle2">
                  {formik.errors.fullname}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Username
              </Typography>
              <CustomTextField
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="example.StevenJonbs"
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
                  {formik.errors.email}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Password
              </Typography>
              <CustomTextField
                type={showPassword ? "text" : "password"}
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
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
            <FormControl>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Repeat Password
              </Typography>
              <CustomTextField
                type={repeatshowPassword ? "text" : "password"}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                placeholder="Repeat Password"
                id="repeatPassword"
                name="repeatPassword"
                autoComplete="repeatPassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle repeatPassword visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: "secondary.icon",
                      }}
                    >
                      {repeatshowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.repeatPassword && (
                <Typography variant="subtitle2">
                  {formik.errors.repeatPassword}
                </Typography>
              )}
            </FormControl>

            <ButtonPrimary
              height={true}
              disabled={!(formik.dirty && formik.isValid) || Loader}
              type="submit"
              width={"100%"}
            >
              {Loader ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "Sign up"
              )}
            </ButtonPrimary>
            <Box
              sx={{ display: "flex", gap: "15px", justifyContent: "center" }}
            >
              <Typography variant="body1" sx={StyledTypography(true)}>
                Already have an account?
              </Typography>
              <Typography
                variant="body1"
                sx={StyledTypography()}
                onClick={() => {
                  navigate(`/sign-in`);
                }}
              >
                Sign in
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
