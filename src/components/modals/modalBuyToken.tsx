import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  FormControl,
  InputBase,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { ArrowRightRounded, GppMaybeOutlined } from "@mui/icons-material";
import { useMoralis } from "react-moralis";
import useGetTokenPrice from "@/hooks/useGetTokenPrice";
import { auth } from "@/config/moralis-connect";
import { getStripe, stripeProducts, stripeRedirections } from "@/config/stripe";
import { utils } from "ethers";
import ButtonPrimary from "@/components/buttons/buttonPrimary";
export const { parseUnits, formatUnits } = utils;

const TextFieldCustom = styled(InputBase)(({ theme }) => ({
  backgroundColor: "transparent",
  borderBottom: "2px solid",
  borderColor: theme.palette.secondary.icon,
  ".MuiInputBase-input": {
    color: (theme.palette.text as any).tertiary,
    fontSize: (theme.typography as any).subtitle1.fontSize,
    fontWeight: (theme.typography as any).subtitle1.fontWeight,
  },
}));
function StyledDivider() {
  return {
    height: "1.5px",
    backgroundColor: "common.two",
    my: "10px",
    width: "120%",
  };
}
function Boxprice(props: any) {
  function StyledContainer() {
    return {
      width: "100%",
      border: "2px solid",
      borderColor: "secondary.icon",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      p: "10px",
      gap: { xs: "5px", lg: "10px" },
    };
  }
  function StyledBoxChildren() {
    return {
      display: "flex",
      justifyContent: "center",
      gap: { xs: "5px", sm: "10px" },
    };
  }
  function StyledTypography() {
    return {
      color: "text.secondary",
      fontWeight: "500",
    };
  }
  return (
    <Box sx={StyledContainer}>
      <Box sx={StyledBoxChildren}>
        <Typography variant="subtitle2" sx={StyledTypography}>
          Price Matic
        </Typography>
        <ArrowRightRounded sx={{ color: "secondary.icon" }} />
        <Typography variant="subtitle2" sx={StyledTypography}>
          USD {props.maticPrice.toFixed(2) ?? ""}
        </Typography>
      </Box>
      <Box sx={StyledBoxChildren}>
        <Typography variant="subtitle2" sx={StyledTypography}>
          1 {auth.token}
        </Typography>
        <ArrowRightRounded sx={{ color: "secondary.icon" }} />
        <Typography variant="subtitle2" sx={StyledTypography}>
          {props.maticPrice.toFixed(4) ?? ""} Matic
        </Typography>
      </Box>
      {!props.loader && props.values.coot && props.values.coot > 0 ? (
        <>
          <Box sx={StyledBoxChildren}>
            <Typography variant="subtitle2" sx={StyledTypography}>
              Total
            </Typography>
            <ArrowRightRounded sx={{ color: "secondary.icon" }} />
            <Typography variant="subtitle2" sx={StyledTypography}>
              {`${props.recieveToken}${auth.token}/${props.maticrecieve.toFixed(
                4
              )} Matic`}
            </Typography>
          </Box>
          <Box sx={StyledBoxChildren}>
            <Typography variant="subtitle2" sx={StyledTypography}>
              Amount to Pay
            </Typography>
            <ArrowRightRounded sx={{ color: "secondary.icon" }} />
            <Typography variant="subtitle2" sx={StyledTypography}>
              USD {props.totalUSD}
            </Typography>
          </Box>
        </>
      ) : props.loader ? (
        <CircularProgress sx={{ color: "secondary.main" }} />
      ) : null}
    </Box>
  );
}
function BoxWarning() {
  function StyledContainer() {
    return {
      width: "100%",
      border: "2px solid",
      borderColor: "secondary.icon",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      p: "10px",
      gap: "10px",
    };
  }
  function StyledTypography() {
    return {
      color: "text.secondary",
      fontWeight: "500",
      textAlign: "center",
      textWrap: "balance",
    };
  }
  return (
    <Box sx={StyledContainer}>
      <GppMaybeOutlined
        sx={{
          color: "secondary.icon",
          fontSize: { xs: "35px", sm: "50px", md: "70px" },
        }}
      />
      <Typography variant="subtitle2" sx={StyledTypography}>
        you need to have matic, for a small gas commission, you can add it by
        yourself, or buy it through tdc minimum matic required in usd 5$.Note:
        the market automatically adds the $5 when making the purchase by tdc{" "}
      </Typography>
    </Box>
  );
}
export default function ModalBuyToken() {
  const { Moralis } = useMoralis();
  const [opens, setOpens] = useState(false);
  const [timing, setTiming] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const [maticrecieve, setrecieveMatic] = useState(0);
  const [total, setTotal] = useState(0);
  const [recieve, setrecieve] = useState(0);
  const [maticPrice, setPriceMatic] = useState(0);
  const [values, setValues] = useState<any>({
    coot: "",
    sgb: "",
  });
  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClose = () => {
    setOpens(false);
  };
  const handleStripe = async () => {
    const stripe = await getStripe;
    if (stripe) {
      let user = Moralis.User.current();
      if (user) {
        let payment = await Moralis.Cloud.run("setTDCPayment", {
          address: user.get("ethAddress"),
          tokens: recieve,
          matic: parseFloat(maticrecieve.toFixed(8)),
          cost: total,
        });
        await stripe.redirectToCheckout({
          lineItems: [
            {
              price: stripeProducts.token[auth.token],
              quantity: recieve,
            },
            {
              price: stripeProducts.matic,
              quantity: 1,
            },
          ],
          mode: "payment",
          successUrl: `${stripeRedirections.success}/${payment}`,
          cancelUrl: `${stripeRedirections.cancel}/${payment}`,
        });
      }
    }
  };
  const getMaticPrice = async () => {
    const priceUsdMatic = await useGetTokenPrice();
    setPriceMatic(priceUsdMatic);
  };
  const handleChanges =
    (prop: keyof any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      getMaticPrice();
    };
  useEffect(() => {
    // setStateCircularProgress(true);
    if (timing) {
      clearInterval(timing);
    }
    setTiming(
      setTimeout(() => {
        new Promise(async () => {
          await getMaticPrice();
          let val1 = parseFloat(values.coot);
          setrecieve(val1);
          setrecieveMatic(5 * maticPrice);
          setTotal(val1 + 5);
          values.coot > 1 || values.coot;
          // setStateCircularProgress(false);
        });
        // setStateCircularProgress(false);
      }, 1000)
    );
    // setStateCircularProgress(false);
  }, [values.coot]);

  return (
    <>
      <ButtonPrimary width="100%" onClick={handleClickOpen}>
        BUY KNRT
      </ButtonPrimary>
      <Dialog
        open={opens}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
      >
        <DialogContent
          sx={{
            width: {
              xs: "250px",
              sm: "320px",
              md: "400px",
              lg: "420px",
              xl: "480px",
            },
            backgroundColor: "background.default",
            p: { xs: "20px", lg: "30px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: "10px", sm: "12px", md: "15px", lg: "20px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                width: "fit-content",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              Buy Token
              <Divider sx={StyledDivider} />
            </Typography>
            <FormControl sx={{ width: "100%" }}>
              <TextFieldCustom
                type="number"
                id="standard-adornment-amount"
                value={values.coot}
                onChange={handleChanges("coot")}
                placeholder="Amount you buy"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        width: "100%",
                        height: "auto",
                        color: "text.primary",
                        textAlign: "center",
                      }}
                    >
                      {auth.token}
                    </Typography>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Boxprice
              maticPrice={maticPrice}
              loader={loader}
              values={values}
              recieveToken={recieve}
              totalUSD={total}
              maticrecieve={maticrecieve}
            />
            <BoxWarning />
            <DialogActions sx={{ display: "flex", gap: "20px" }}>
              <ButtonPrimary
                height={true}
                disabled={!(values.coot && values.coot > 1)}
                onClick={handleStripe}
              >
                Buy token
              </ButtonPrimary>
              <ButtonPrimary height={true} onClick={handleClose}>
                Cancel
              </ButtonPrimary>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
