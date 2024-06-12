import * as React from "react";
import { useParams } from "react-router";
import { useMoralis } from "react-moralis";
import { Stack, Typography } from "@mui/material";
import Loading from "@/components/payments/loading";
import Grid from "@mui/material/Grid";
import ErrorIcon from "@mui/icons-material/Error";

function Error(): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        m: 2,
        p: 3,
      }}
    >
      <Grid item xs={12} zeroMinWidth>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ alignItems: "center", my: 1 }}
        >
          <ErrorIcon
            style={{
              color: "white",
              fontSize: "4rem",
              margin: "1rem 0px",
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} zeroMinWidth>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ alignItems: "center", my: 1 }}
        >
          <Typography
            noWrap
            sx={{
              fontFamily: "Poppins600SemiBold",
              color: "white",
              fontSize: 18,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              mb: 11,
            }}
          >
            Your payment did not complete, please try again later.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
function MessagePayment(): JSX.Element {
  return (
    <Grid item xs={12} zeroMinWidth>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ my: 5 }}>
        <Error />
      </Stack>
    </Grid>
  );
}
export default function Payment(props: any) {
  const { Moralis } = useMoralis();
  const { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [request, setRequest] = React.useState(false);
  if (loader && !request) {
    setRequest(true);
    Moralis.Cloud.run("cancelTDCPayment", { id })
      .then(() => {
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
      });
  }
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      sx={{ px: 2, py: 1, backgroundColor: "black" }}
    >
      {!loader ? <MessagePayment /> : <Loading />}
    </Grid>
  );
}
