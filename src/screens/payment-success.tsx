import * as React from "react";
import { useParams } from "react-router";
import { Avatar, Stack, Typography } from "@mui/material";
import { auth } from "@/config/moralis-connect";
import { useMoralis } from "react-moralis";
import Loading from "@/components/payments/loading";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

let matic =
  "https://ipfs.moralis.io:2053/ipfs/QmfA199t9GRga69GwwAMfNYRUbLVCsjz3ESyiwVULyDV4i/0xE568887Bf75AeA78147730CC4101aDf09626759E/polygon_matic_logo.svg";
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
            Payment request does not exist
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
function Success(props: any): JSX.Element {
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
          <DoneIcon
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
              mb: 5,
            }}
          >
            {!props.completed ? (
              <span>Soon your payment will be processed</span>
            ) : (
              <span>Your Payment is Completed!</span>
            )}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} zeroMinWidth>
        <Grid
          spacing={0}
          sx={{
            border: "0.5px solid #dbdbdb",
            borderRadius: 3,
            justifyContent: "center",
            alignItems: "center",
            m: 2,
            p: 3,
            background: "white",
          }}
        >
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
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                Wallet
              </Typography>
              <ArrowForwardIcon sx={{ color: "#838990", fontSize: 18 }} />
              <Typography
                noWrap
                sx={{
                  fontFamily: "Poppins600SemiBold",
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {props.address}
              </Typography>
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
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                Tokens
              </Typography>
              <ArrowForwardIcon sx={{ color: "#838990", fontSize: 18 }} />
              <Typography
                noWrap
                sx={{
                  fontFamily: "Poppins600SemiBold",
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {props.tokens} {auth.token}
              </Typography>
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
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Avatar alt="Matic Token" src={matic} />
                </Stack>
              </Typography>
              <ArrowForwardIcon sx={{ color: "#838990", fontSize: 18 }} />
              <Typography
                noWrap
                sx={{
                  fontFamily: "Poppins600SemiBold",
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {props.matic}
              </Typography>
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
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                Cost Amount
              </Typography>
              <ArrowForwardIcon sx={{ color: "#838990", fontSize: 18 }} />
              <Typography
                noWrap
                sx={{
                  fontFamily: "Poppins600SemiBold",
                  color: "#838990",
                  fontSize: 18,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                USD {props.cost}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function MessagePayment(props: any): JSX.Element {
  return (
    <Grid item xs={12} zeroMinWidth>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ my: 5 }}>
        {props.payment ? (
          <Success
            address={props.payment.address}
            tokens={props.payment.tokens}
            matic={props.payment.matic}
            cost={props.payment.cost}
            fulfilled={props.payment.fulfilled}
            completed={props.payment.completed}
          />
        ) : (
          <Error />
        )}
      </Stack>
    </Grid>
  );
}
export default function Payment(props: any) {
  const { Moralis } = useMoralis();
  const { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [payment, setPayment] = React.useState(false);
  const [request, setRequest] = React.useState(false);

  if (loader && !request) {
    setRequest(true);
    Moralis.Cloud.run("fulfillTDCPayment", { id })
      .then((data: any) => {
        setLoader(false);
        setPayment(data);
      })
      .catch((error: any) => {
        setLoader(false);
        setPayment(false);
      });
  }
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      sx={{ px: 2, py: 1, backgroundColor: "black" }}
    >
      {!loader ? <MessagePayment payment={payment} /> : <Loading />}
    </Grid>
  );
}
