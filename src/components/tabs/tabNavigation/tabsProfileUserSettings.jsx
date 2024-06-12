import { Typography, Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

import FormSettingsUser from "@/components/form/settingsUser/settingsUser";

export default function TabsProfileUserSettings() {
  const { UserRender, ThemeModeState } = useBoundStore(
    (state) => state,
    shallow
  );

  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  return UserRender.length != 0 ? (
    <FormSettingsUser />
  ) : (
    <Box
      sx={{
        py: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        image={ghost_koolinart}
        alt="Image NFT"
        sx={{
          width: "250px",
          objectFit: "cover",
        }}
      />
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        Nothing found
      </Typography>
    </Box>
  );
}
