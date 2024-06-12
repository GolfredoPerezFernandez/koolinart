import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ModalGlobal from "@/components/modals/modalGlobal";

function StyledCardContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  };
}

export default function CardCertificateMovement(props) {
  let logotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmciCp2vBFZz3Hh9GuKBQdWdgvsS3DMUNMdMdsVzZ6r2US/0xE568887Bf75AeA78147730CC4101aDf09626759E/logotipo_koolinart_v1.svg";
  const date = new Date(props.data?.createdAt ? props.data.createdAt : null);
  const fecha = date.toISOString().split("T")[0];
  const hora = date.toISOString().split("T")[1].split(".")[0];

  return (
    <Box sx={StyledCardContainer}>
      <Typography
        variant="h2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        Movement Certificates
      </Typography>
      <CardMedia
        component="img"
        image={logotipo_koolinart_v1}
        alt="Logo"
        sx={{
          width: { xs: "180px", md: "300px" },
          height: "55px",
          objectFit: "contain",
        }}
      />
      <Box>
        <Typography
          variant="h2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Id:
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {props.data?.tokenId ? props.data.tokenId : props.data.TokenAdmin}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Successfully completed transaction
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Transaction Hash:
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontWeight: "500",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            const transactionHash = props.data?.transactionHash;
            if (transactionHash) {
              const url = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
              window.open(url, "_blank", "noreferrer");
            }
          }}
        >
          {`${
            props.data?.transactionHash
              ? props.data?.transactionHash.slice(0, 6)
              : ""
          }...${
            props.data?.transactionHash
              ? props.data?.transactionHash.slice(-4)
              : ""
          }`}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {fecha} Time: {hora}
        </Typography>
      </Box>
      <ModalGlobal />
    </Box>
  );
}
