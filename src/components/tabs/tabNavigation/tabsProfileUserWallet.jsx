import { Typography, Box, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import Clipboard from "@/components/clipboard/clipboard";

function StyledBox() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "background.paper",
    borderRadius: "20px",
    border: "2px solid",
    borderColor: "secondary.main",
    width: "fit-content",
    height: "150px",
    p: "10px 20px",
  };
}

const BoxAmount = (props) => {
  return (
    <Box sx={StyledBox}>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        Amount
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {props.Amount}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {props.title}
      </Typography>
    </Box>
  );
};

export default function TabsProfileUserWallet() {
  const { UserRender, AmountKnrtUser, MaticBalance, ThemeModeState } =
    useBoundStore((state) => state, shallow);
  const ethAddress = UserRender.attributes?.ethAddress
    ? UserRender.attributes.ethAddress
    : "";
  const privateKey = UserRender.attributes?.privateKey
    ? UserRender.attributes.privateKey
    : "";
  const mnemonic = UserRender.attributes?.mnemonic
    ? UserRender.attributes.mnemonic
    : "";

  const balanceMatic = MaticBalance ? MaticBalance.slice(0, 7) : 0;
  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  return UserRender.length != 0 ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography
        variant="h2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        Wallet
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <BoxAmount title="KNRT" Amount={AmountKnrtUser ? AmountKnrtUser : 0} />
        <BoxAmount title="MATIC" Amount={balanceMatic} />
      </Box>
      <Box>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          Public key
        </Typography>

        {ethAddress ? (
          <Clipboard
            value={ethAddress}
            title="Public key"
            valueFull={true}
            start={true}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "start" }}
          >
            Nothing found
          </Typography>
        )}
      </Box>
      <Box>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          Private key
        </Typography>

        {ethAddress && privateKey ? (
          <Clipboard
            value={privateKey}
            title="Private key"
            valueFull={true}
            start={true}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "start" }}
          >
            Nothing found
          </Typography>
        )}
      </Box>
      <Box>
        <Typography variant="h2" sx={{ color: "text.secondary" }}>
          Mnemonic phrase
        </Typography>
        {ethAddress && mnemonic ? (
          <Clipboard
            value={mnemonic}
            title="Address"
            valueFull={true}
            start={true}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "start" }}
          >
            Nothing found
          </Typography>
        )}
      </Box>
    </Box>
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
