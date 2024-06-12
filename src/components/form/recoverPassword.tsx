import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { RecoverPasswordInValidation } from "@/schemas-validation";
import {
  Box,
  styled,
  InputBase,
  FormControl,
  FormHelperText,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
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

export default function FormRecoverPassword() {
  const { RecoverPassword }: any = useContext(UserContext);
  const { ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } = useBoundStore(
    (state: any) => state,
    shallow
  );
  let navigate = useNavigate();
  const [Loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: RecoverPasswordInValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoader(true);
        await RecoverPassword(values);
        resetForm();
        setLoader(false);
        navigate(`/sign-in`);
        ChangeTypeAlert(`success`);
        ChangeTitleAlert(`Success sending recovery mail`);
        ChangeStateAlert(true);
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
              Recover Password
            </Typography>
            <FormControl>
              <CustomTextField
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
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

            <ButtonPrimary
              height={true}
              disabled={!(formik.dirty && formik.isValid) || Loader}
              type="submit"
            >
              {Loader ? (
                <CircularProgress
                  sx={{ color: "secondary.main" }}
                  size="25px"
                />
              ) : (
                "Confirm"
              )}
            </ButtonPrimary>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
