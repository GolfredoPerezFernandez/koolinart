import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette(mode) {
  return {
    action: {
      active: neutral[500],
      disabled: "#FFFFFF",
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    error,
    info,
    mode: mode,
    ...(mode == "light"
      ? {
          background: {
            default: "#FFFFFF",
            paper: "#EAE8E8",
          },
          primary: {
            main: "#F6F6F6",
          },
          secondary: {
            main: "#C02327",
            icon: "#353535",
            shared: "#353535",
          },
          text: {
            primary: "#C02327",
            secondary: "#303030",
            tertiary: "#414141",
          },
          common: {
            one: "#C02327",
            two: "#000000",
            tree: "#EAE8E8",
          },
        }
      : {
          background: {
            default: "#303030",
            paper: "#353535",
          },
          primary: {
            main: "#595959",
          },
          secondary: {
            main: "#C02327",
            icon: "#EAE8E8",
            shared: "#EAE8E8",
          },
          text: {
            primary: "#C02327",
            secondary: "#FFFFFF",
            tertiary: "#EAE8E8",
          },
          common: {
            one: "#EAE8E8",
            two: "#FFFFFF",
            tree: "#353535",
          },
        }),
    neutral,
    success,
    warning,
  };
}
