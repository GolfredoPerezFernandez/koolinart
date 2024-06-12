import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { auth, contracts, chainID } from "@/config/moralis-connect";
import { useMoralis } from "react-moralis";
import Payments from "@/components/payments/payments-validation";
import Loading from "@/components/payments/loading";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  Modal,
  Pagination,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { grey } from "@mui/material/colors";

import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import useGetWalletTokenBalances from "@/hooks/useGetWalletTokenBalances";
import useGetNativeBalance from "@/hooks/useGetNativeBalance";

let matic =
  "https://ipfs.moralis.io:2053/ipfs/QmfA199t9GRga69GwwAMfNYRUbLVCsjz3ESyiwVULyDV4i/0xE568887Bf75AeA78147730CC4101aDf09626759E/polygon_matic_logo.svg";
function TypographyStyles(color: any = "white") {
  return {
    fontFamily: "Poppins600SemiBold",
    color: color,
    fontSize: 22,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    mb: 0,
    py: 0,
  };
}

function ButtonStyles() {
  return {
    backgroundColor: "#637bfe",
    borderRadius: 3,
    fontFamily: "Poppins600SemiBold",
    fontSize: 10,
    "&:hover": {
      backgroundColor: grey[700],
    },
    minHeight: 55,
  };
}

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
            There is an error, please try again later.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

function AlertSnackFailed(props: any): JSX.Element {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity="error" sx={{ width: "100%" }}>
        There has been an error with one of the transfers. Check your Token and
        Matic Balance.
      </Alert>
    </Snackbar>
  );
}

function AlertSnackSuccess(props: any): JSX.Element {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity="success" sx={{ width: "100%" }}>
        Transfers completed!
      </Alert>
    </Snackbar>
  );
}

function TablePaymentsFulfilleds(props: any): JSX.Element {
  const [checkedRows, setCheckedRows] = React.useState(new Array());
  var rows = new Array();
  const checkAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    var selecting = new Array();
    if (event.target.checked) {
      for (let index = 0; index < props.dataRow.result.length; index++) {
        selecting.push(props.dataRow.result[index]);
      }
    }
    setCheckedRows(selecting);
  };

  const checkOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    element: any
  ) => {
    var selecting = [...checkedRows];
    if (event.target.checked) {
      if (!selecting.some((row: any) => row.id === element.id)) {
        selecting.push(element);
      }
    } else {
      selecting = selecting.filter((row: any) => {
        if (row.id !== element.id) {
          return row;
        }
      });
    }
    setCheckedRows(selecting);
  };

  if (props.dataRow) {
    for (let index = 0; index < props.dataRow.result.length; index++) {
      rows.push(
        <TableRow
          key={props.dataRow.result[index].id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            fontFamily: "Poppins600SemiBold",
          }}
        >
          <TableCell align="center" component="th" scope="row">
            <Checkbox
              checked={checkedRows.some(
                (element) => element.id === props.dataRow.result[index].id
              )}
              onChange={(evt) => {
                checkOne(evt, props.dataRow.result[index]);
              }}
            />
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {props.dataRow.result[index].address}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {props.dataRow.result[index].tokens}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            ~{props.dataRow.result[index].matic}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            USD {props.dataRow.result[index].cost}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {new Date(props.dataRow.result[index].createdAt).toLocaleDateString(
              `en-US`,
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            <Button
              variant="contained"
              sx={ButtonStyles()}
              onClick={() => {
                props.onTransfer([props.dataRow.result[index]]);
              }}
            >
              Transfer Tokens
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  }
  return (
    <Grid item xs={12} zeroMinWidth>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ my: 5 }}>
        {props.dataRow ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: "100%" }}
              size="medium"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox
                      indeterminate={
                        checkedRows.length != 0 &&
                        checkedRows.length !== props.dataRow.result.length
                      }
                      onChange={checkAll}
                      disabled={rows.length == 0}
                    />
                  </TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">{auth.token}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Avatar alt="Matic Token" src={matic} />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">Cost</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={ButtonStyles()}
                      disabled={rows.length == 0 || checkedRows.length == 0}
                      onClick={() => {
                        props.onTransfer(checkedRows);
                      }}
                    >
                      Transfer Tokens to Selected
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Error />
        )}
      </Stack>
    </Grid>
  );
}
function TablePaymentsCompleteds(props: any): JSX.Element {
  var rows = new Array();
  if (props.dataRow) {
    for (let index = 0; index < props.dataRow.result.length; index++) {
      rows.push(
        <TableRow
          key={props.dataRow.result[index].id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            fontFamily: "Poppins600SemiBold",
          }}
        >
          <TableCell align="center" component="th" scope="row">
            {props.dataRow.result[index].id}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {props.dataRow.result[index].address}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {props.dataRow.result[index].tokens}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            ~{props.dataRow.result[index].matic}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            USD {props.dataRow.result[index].cost}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {new Date(props.dataRow.result[index].updatedAt).toLocaleDateString(
              `en-US`,
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            <Button
              variant="contained"
              target="_blank"
              sx={ButtonStyles()}
              href={`${auth.blockExplorerUrl}tx/${props.dataRow.result[index].hashToken}`}
            >
              View
            </Button>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            <Button
              variant="contained"
              target="_blank"
              sx={ButtonStyles()}
              href={`${auth.blockExplorerUrl}tx/${props.dataRow.result[index].hashMatic}`}
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  }
  return (
    <Grid item xs={12} zeroMinWidth>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ my: 5 }}>
        {props.dataRow ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: "100%" }}
              size="medium"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">{auth.token}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Avatar alt="Matic Token" src={matic} />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">Cost</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Token Transaction</TableCell>
                  <TableCell align="center">Matic Transaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Error />
        )}
      </Stack>
    </Grid>
  );
}
function PagerOptions(props: any): JSX.Element {
  var count = props.data ? Math.ceil(props.data.count / 10) : 0;
  return (
    <Grid item xs={12} zeroMinWidth>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Pagination
          shape="rounded"
          count={count}
          defaultPage={props.default}
          style={{ background: "white", borderRadius: 3, padding: "0.5rem" }}
          onChange={props.onChange}
        />
      </Stack>
    </Grid>
  );
}
function TransferModal(props: any): JSX.Element {
  const { UserRender } = useBoundStore((state: any) => state, shallow);
  const { Moralis } = useMoralis();
  const [transfering, setTransfering] = React.useState(false);
  const [transferCandidates, setTransferCandidates] = React.useState<any[]>([]);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const [nativeBalance, setNativeBalance] = React.useState(0);

  React.useEffect(() => {
    async function hola() {
      await getBalances();
    }
    hola();
  }, []);

  React.useEffect(() => {
    setTransferCandidates(props.dataTransfer);
  }, [props.dataTransfer]);

  var rows = new Array();
  var totalMatic = 0;
  var totalToken = 0;
  if (props.dataTransfer) {
    for (let index = 0; index < transferCandidates.length; index++) {
      totalMatic += transferCandidates[index].matic;
      totalToken += transferCandidates[index].tokens;
      rows.push(
        <TableRow
          key={transferCandidates[index].id}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            fontFamily: "Poppins600SemiBold",
          }}
        >
          <TableCell align="center" component="th" scope="row">
            {transferCandidates[index].address}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {transferCandidates[index].tokens}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            ~{transferCandidates[index].matic}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {transferCandidates[index].completed
              ? "Success!"
              : transfering
              ? "Pending..."
              : "Ready to Transfer"}
          </TableCell>
        </TableRow>
      );
    }
    rows.push(
      <TableRow
        key="total"
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          fontFamily: "Poppins600SemiBold",
        }}
      >
        <TableCell align="right" component="th" scope="row">
          <strong>Total</strong>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {totalToken}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          ~{totalMatic}
        </TableCell>
      </TableRow>
    );
  }

  async function transfer() {
    setTransfering(true);
    for (let index = 0; index < transferCandidates.length; index++) {
      try {
        await new Promise(async (resolve, reject) => {
          var list_transfers = [];
          list_transfers.push(
            Moralis.transfer({
              type: "erc20",
              amount: Moralis.Units.Token(
                transferCandidates[index].tokens.toString(),
                18
              ),
              receiver: transferCandidates[index].address,
              contractAddress: contracts.token,
            }).catch((error: any) => {
              reject(error);
            })
          );
          list_transfers.push(
            Moralis.transfer({
              type: "native",
              amount: Moralis.Units.ETH(
                transferCandidates[index].matic.toString()
              ),
              receiver: transferCandidates[index].address,
            }).catch((error: any) => {
              reject(error);
            })
          );
          Promise.all(list_transfers).then(async (results: any) => {
            try {
              const resultToken = await results[0].wait();
              const resultMatic = await results[1].wait();
              Moralis.Cloud.run("completeTDCPayment", {
                hashToken: resultToken.transactionHash,
                hashMatic: resultMatic.transactionHash,
                id: transferCandidates[index].id,
              })
                .then((data: any) => {
                  var replica = [...transferCandidates];
                  replica[index].completed = true;
                  setTransferCandidates(replica);
                  resolve(true);
                })
                .catch((error: any) => {
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          });
        });
      } catch (err) {
        props.transferCompleted({
          element: transferCandidates[index],
          error: err,
        });
        setTransfering(false);
        return;
      }
    }
    getBalances();
    props.transferCompleted({
      element: null,
      error: false,
    });
    setTransfering(false);
  }
  async function getBalances() {
    const ethAddress = UserRender.attributes?.ethAddress
      ? UserRender.attributes?.ethAddress
      : "";
    if (ethAddress) {
      try {
        const tokens = await useGetWalletTokenBalances(ethAddress);
        var token = tokens.find((element: any) => {
          return (
            element.token_address.toLowerCase() == contracts.token.toLowerCase()
          );
        });

        if (token) {
          var balanceDecimal = token.balance * Math.pow(10, -token.decimals);
          setTokenBalance(balanceDecimal);
        } else {
          setTokenBalance(0);
        }
      } catch (error) {
        setNativeBalance(0);
      }
    }
    try {
      if (ethAddress) {
        const native = await useGetNativeBalance(ethAddress);
        var balance: any = Moralis.Units.FromWei(native.balance);
        setNativeBalance(balance);
      }
    } catch (error) {
      setNativeBalance(0);
    }
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.dataTransfer.length > 0}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.dataTransfer.length > 0}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 1,
                m: { xs: 1, md: 3, lg: 5, xl: 10 },
                px: { xs: 1, md: 3, lg: 5, xl: 10 },
                py: 5,
              }}
            >
              <Grid
                container
                spacing={0}
                alignItems="center"
                sx={{ px: 2, py: 1 }}
              >
                <Grid item xs={12} zeroMinWidth>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Typography noWrap sx={TypographyStyles("black")}>
                      Proceed to transfer?
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    sx={{
                      mt: 3,
                      border: "1px solid lightgrey",
                      px: 1,
                      borderRadius: 1,
                    }}
                  >
                    <TableContainer>
                      <Table
                        sx={{ minWidth: "100%" }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">{auth.token}</TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                              >
                                <Avatar alt="Matic Token" src={matic} />
                              </Stack>
                            </TableCell>
                            <TableCell align="center">State</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                  <Stack
                    direction="row"
                    justifyContent="right"
                    spacing={1}
                    sx={{ mt: 5 }}
                  >
                    <Button
                      variant="contained"
                      sx={ButtonStyles()}
                      onClick={transfer}
                      disabled={
                        transfering ||
                        totalToken > tokenBalance ||
                        totalMatic > nativeBalance
                      }
                    >
                      {transfering
                        ? "Wait..."
                        : totalToken > tokenBalance ||
                          totalMatic > nativeBalance
                        ? "Insufficient Balance"
                        : "Proceed"}
                    </Button>
                    <Button
                      variant="contained"
                      sx={ButtonStyles()}
                      onClick={props.setClose}
                      disabled={transfering}
                    >
                      Close
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default function Payment(props: any) {
  const { Moralis } = useMoralis();
  let navigate = useNavigate();
  const [loaderTDC, setLoaderTDC] = React.useState(true);
  const [requestTDC, setRequestTDC] = React.useState(false);
  const [loaderFulfilled, setloaderFulfilled] = React.useState(true);
  const [paymentFulfilled, setPaymentFulfilled] = React.useState();
  const [pageFulfilled, setPageFulfilled] = React.useState(1);
  const [loaderCompleted, setloaderCompleted] = React.useState(true);
  const [paymentCompleted, setPaymentCompleted] = React.useState();
  const [pageCompleted, setPageCompleted] = React.useState(1);
  const [transferList, setTransferList] = React.useState([]);
  const [alertMessageFailed, setAlertMessageFailed] = React.useState(false);
  const [alertMessageSuccess, setAlertMessageSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!requestTDC) {
      setRequestTDC(true);
      var list_promises = new Array();
      list_promises.push(getFulfilledTDCPayments());
      list_promises.push(getCompletedTDCPayments());
      Promise.all(list_promises)
        .then(() => {
          setLoaderTDC(false);
        })
        .catch((error) => {
          return error;
        });
    }
  }, []);
  React.useEffect(() => {
    getFulfilledTDCPayments();
  }, [pageFulfilled]);
  React.useEffect(() => {
    getCompletedTDCPayments();
  }, [pageCompleted]);
  function getFulfilledTDCPayments() {
    setloaderFulfilled(true);
    return new Promise<void>((resolve, reject) => {
      Moralis.Cloud.run("getFulfilledTDCPayments", {
        page: pageFulfilled,
      })
        .then((data: any) => {
          setPaymentFulfilled(data);
          setloaderFulfilled(false);
          resolve();
        })
        .catch((error: any) => {
          setloaderFulfilled(false);
          reject(error);
        });
    });
  }
  function getCompletedTDCPayments() {
    setloaderCompleted(true);
    return new Promise<void>((resolve, reject) => {
      Moralis.Cloud.run("getCompletedTDCPayments", {
        page: pageCompleted,
      })
        .then((data: any) => {
          setPaymentCompleted(data);
          setloaderCompleted(false);
          resolve();
        })
        .catch((error: any) => {
          setloaderCompleted(false);
          reject(error);
        });
    });
  }
  function transfersFinish(result: any) {
    if (result.error) {
      setAlertMessageFailed(true);
    } else {
      setAlertMessageSuccess(true);
    }
    setTransferList([]);
    getFulfilledTDCPayments();
    getCompletedTDCPayments();
  }
  return (
    <Payments
      failed={() => {
        navigate("/home");
      }}
    >
      <TransferModal
        dataTransfer={transferList}
        setClose={() => setTransferList([])}
        transferCompleted={transfersFinish}
      />
      <AlertSnackFailed
        open={alertMessageFailed}
        onClose={() => {
          setAlertMessageFailed(false);
        }}
      />
      <AlertSnackSuccess
        open={alertMessageSuccess}
        onClose={() => {
          setAlertMessageSuccess(false);
        }}
      />
      {!loaderTDC ? (
        <Grid
          container
          spacing={0}
          alignItems="center"
          sx={{ px: 2, py: 1, backgroundColor: "black" }}
        >
          <Grid item xs={12} zeroMinWidth>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              sx={{ mt: 5 }}
            >
              <Typography noWrap sx={TypographyStyles()}>
                Payments Requests
              </Typography>
            </Stack>
          </Grid>
          {!loaderFulfilled ? (
            <Grid item xs={12} zeroMinWidth>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  sx={{ px: 2, py: 1 }}
                >
                  <TablePaymentsFulfilleds
                    dataRow={paymentFulfilled}
                    onTransfer={(data: any) => {
                      setTransferList(data);
                    }}
                  />
                  <PagerOptions
                    data={paymentFulfilled}
                    default={pageFulfilled}
                    onChange={(event: any, value: any) => {
                      setPageFulfilled(value);
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
          ) : (
            <Loading />
          )}
          <Grid item xs={12} zeroMinWidth>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              sx={{ mt: 5 }}
            >
              <Typography noWrap sx={TypographyStyles()}>
                Payments Completed
              </Typography>
            </Stack>
          </Grid>
          {!loaderCompleted ? (
            <Grid item xs={12} zeroMinWidth sx={{ mb: 5 }}>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  sx={{ px: 2, py: 1 }}
                >
                  <TablePaymentsCompleteds dataRow={paymentCompleted} />
                  <PagerOptions
                    data={paymentCompleted}
                    default={pageCompleted}
                    onChange={(event: any, value: any) => {
                      setPageCompleted(value);
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
          ) : (
            <Loading />
          )}
        </Grid>
      ) : (
        <Loading />
      )}
    </Payments>
  );
}
