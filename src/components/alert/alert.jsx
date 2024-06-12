import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar, AlertTitle } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

export default function CustomizedSnackbars() {
  const {
    StateAlert,
    TitleAlert,
    TypeAlert,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
  } = useBoundStore((state) => state, shallow);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    ChangeStateAlert(false), ChangeTitleAlert(""), ChangeTypeAlert("error");
  };
  return (
    <Snackbar
      open={StateAlert}
      autoHideDuration={4000}
      onClose={handleClose}
      sx={{ display: StateAlert ? "flex" : "none" }}
    >
      <Alert onClose={handleClose} severity={TypeAlert}>
        <AlertTitle>{TypeAlert}</AlertTitle>

        {TitleAlert}
      </Alert>
    </Snackbar>
  );
}
