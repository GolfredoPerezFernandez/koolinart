import {
  createTheme,
  filledInputClasses,
  inputLabelClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses,
} from "@mui/material";

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents(config) {
  const { palette } = config;
  const isDarkMode = palette.mode === "dark"; // Verifica si el tema es oscuro

  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
        },
        sizeSmall: {
          padding: "0px",
        },
        sizeMedium: {
          padding: "0px",
        },
        sizeLarge: {
          padding: "0px",
        },
        textSizeSmall: {
          padding: "0px",
        },
        textSizeMedium: {
          padding: "0px",
        },
        textSizeLarge: {
          padding: "0px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: isDarkMode
              ? "5px  8px  10px  0px rgb(0, 0, 0,0.3)"
              : "5px  8px  10px  0px rgb(100, 100, 100,0.3),-0.2px  0px  10px  0px rgb(100, 100, 100,0.3)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          "&:last-child": {
            paddingBottom: "0px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "0px 16px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          backgroundColor: palette.primary.main,
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          border: "none",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
          "&::placeholder": {
            color: palette.text.secondary,
            border: "none",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: 1,
          overflow: "hidden",
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
          "&:hover": {
            backgroundColor: palette.action.hover,
          },
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: "transparent",
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: "transparent",
            border: "none",
            boxShadow: `${palette.primary.main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`,
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0px",
          "&:hover": {
            backgroundColor: palette.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.neutral[200],
              border: "none",
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: "transparent",
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.main,
              boxShadow: `${palette.primary.main} 0 0 0 2px`,
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.error.main,
              boxShadow: `${palette.error.main} 0 0 0 2px`,
            },
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
        notchedOutline: {
          borderColor: palette.neutral[200],
          transition: muiTheme.transitions.create([
            "border-color",
            "box-shadow",
          ]),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          padding: 0,
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          backgroundColor: "red",
          padding: 0,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            color: palette.neutral[700],
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        border: "none",
      },
      styleOverrides: {
        root: {
          border: "none",
          padding: "0px",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          [`@media (min-width:  1024px)`]: {
            paddingLeft: "50px",
            paddingRight: "50px",
            margin: "10px 0px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          fontSize: "14px",
        },
        root: {
          "&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
            {
              padding: 0, // Quita el padding-right
            },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.MuiAccordion-root": {
            boxShadow: "none",
            padding: "0px",
          },
          "&.MuiAccordion-root:first-of-type": {
            boxShadow: "none",
            padding: "0px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
          "&.MuiAccordion-root:last-of-type": {
            boxShadow: "none",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          padding: "3px", // Aplica el padding deseado
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fontSize: { xs: "18px", sm: "20px" },
          fontWeight: 500,
          padding: "20px",
          fill: "#C02327",
        },
        root: {
          "&.Mui-completed": {
            color: "green",
            outline: "2px solid #353535",
            borderRadius: "100%",
          },
          "&.Mui-active": {
            color: "secondary.icon",
            outline: "2px solid #353535",
            borderRadius: "100%",
          },
          "&.Mui-error": {
            outline: "0px solid #353535",
          },
        },
      },
    },
  };
}
