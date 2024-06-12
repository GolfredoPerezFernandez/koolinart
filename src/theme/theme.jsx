import { createPalette } from "@/theme/createPalette";
import { createComponents } from "@/theme/createComponents";
import { createShadows } from "@/theme/createShadows";
import { createTypography } from "@/theme/createTypography";

export default function theme(ThemeModeState) {
  const palette = createPalette(ThemeModeState);
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1440,
        xl: 2000,
      },
    },
    typography,
    components,
    shadows,
    palette,
  };
}
