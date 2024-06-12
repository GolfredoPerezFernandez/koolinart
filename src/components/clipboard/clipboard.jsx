import { useContext, useState } from "react";
import { Box, InputBase, IconButton, Typography } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { ContentCopyOutlined } from "@mui/icons-material";

import copy from "copy-to-clipboard";

export default function Clipboard(props) {
  let valueNew = props.value
    ? props.valueFull
      ? props.value
      : `${props?.value?.slice(0, 6)}...${props?.value?.slice(-4)}`
    : "";

  const { ChangeStateAlert, ChangeTitleAlert, ChangeTypeAlert } = useBoundStore(
    (state) => state,
    shallow
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: props.start ? "start" : "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontWeight: "600",
        }}
      >
        {valueNew}
      </Typography>
      <IconButton
        sx={{
          color: "#C02327",
        }}
        onClick={() => {
          copy(props.value, {
            debug: true,
            message: `${props.value} copy to clipboard`,
          }),
            ChangeTypeAlert(`success`);
          ChangeTitleAlert(`success in copy ${props.title}`);
          ChangeStateAlert(true);
        }}
      >
        <ContentCopyOutlined
          sx={{
            fontSize: { xs: "20px", md: "1.5rem" },
          }}
        />
      </IconButton>
    </Box>
  );
}
