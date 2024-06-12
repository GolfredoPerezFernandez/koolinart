import {
  Box,
  CardMedia,
  AccordionSummary,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { MintContext } from "@/context/Mint/MintContext";
import {
  ArrowForwardIosRounded,
  ArrowBackIosNewRounded,
} from "@mui/icons-material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ButtonUp from "@/components/buttons/buttonUp";
import InfiniteScroll from "react-infinite-scroll-component";
import CardCertificateMovement from "@/components/cards/cardCertificateMovement";

function StyledContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "30px", md: "20px", lg: "25px" },
    mx: { xs: "16px", sm: "24px", md: "50px", lg: "50px" },
    my: { xs: "20px", md: "30px", lg: "40px" },
  };
}
function StyleContainer() {
  return {
    display: "flex",
    flexDirection: "column",
    my: { xs: "15px", lg: "20px" },
    gap: "20px",
  };
}
function StyledContainerItems() {
  return {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };
}

function StyledAccordionDetails() {
  return {
    flexDirection: { xs: "column", sm: "row" },
    padding: "20px",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: {
        xs: "rotate(180deg)",
        sm: "rotate(90deg)",
      },
    },
  };
}

function StyledDataTilte() {
  return {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    px: "10px",
    gap: { xs: "10px", md: "0px" },
  };
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "100%",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Top = () => {
  let navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ArrowBackIosNewRounded
        sx={{
          color: "secondary.icon",
          cursor: "pointer",
          transition: "0.3s",
          ":hover": {
            color: "#C02327",
          },
        }}
        onClick={() => {
          navigate(-1);
        }}
      />
      <Typography
        variant="h2"
        sx={{
          textAlign: "left",
          color: "text.secondary",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Movement Certificates
      </Typography>
    </Box>
  );
};

export default function CertificateMovement() {
  const { MovementCertificateArray, TotalMovementCertificateArray } =
    useBoundStore((state) => state, shallow);
  const { GetCertificates, GetTotalCertificates } = useContext(MintContext);
  const [expanded, setExpanded] = useState(false);
  let logotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmciCp2vBFZz3Hh9GuKBQdWdgvsS3DMUNMdMdsVzZ6r2US/0xE568887Bf75AeA78147730CC4101aDf09626759E/logotipo_koolinart_v1.svg";

  const CertificateMovementItems = () => {
    async function NextNfts() {
      try {
        await GetCertificates(MovementCertificateArray.length);
      } catch (error) {
        ChangeTypeAlert(`error`);
        ChangeTitleAlert(error);
        ChangeStateAlert(true);
      }
    }

    return (
      <Box sx={StyledContainerItems}>
        <InfiniteScroll
          dataLength={MovementCertificateArray.length}
          next={NextNfts}
          hasMore={
            TotalMovementCertificateArray > MovementCertificateArray.length
          }
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Box sx={StyleContainer}>
            {MovementCertificateArray?.map((value, index) => {
              const date = new Date(value?.createdAt ? value.createdAt : null);
              const fecha = date.toISOString().split("T")[0];
              const hora = date.toISOString().split("T")[1].split(".")[0];
              return (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  key={index}
                >
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    expandIcon={
                      <ArrowForwardIosRounded
                        sx={{
                          color: "secondary.main",
                          transform: {
                            xs: "rotate(90deg)",
                            sm: "rotate(90deg)",
                          },
                        }}
                      />
                    }
                    sx={StyledAccordionDetails}
                  >
                    <Box sx={StyledDataTilte}>
                      <CardMedia
                        component="img"
                        image={logotipo_koolinart_v1}
                        alt="Logo"
                        sx={{
                          width: { xs: "120px", md: "189px" },
                          height: "55px",
                          objectFit: "contain",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
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
                          {value?.tokenId ? value.tokenId : value.TokenAdmin}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
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
                          }}
                        >
                          {`${
                            value.transactionHash
                              ? value.transactionHash.slice(0, 6)
                              : ""
                          }...${
                            value.transactionHash
                              ? value.transactionHash.slice(-4)
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
                          {fecha}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "text.secondary",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          Time: {hora}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CardCertificateMovement data={value} />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </InfiniteScroll>
      </Box>
    );
  };
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    async function fetchNft() {
      await GetCertificates(MovementCertificateArray.length);
      await GetTotalCertificates();
    }
    fetchNft();
  }, []);
  return (
    <Box sx={StyledContainer}>
      <Top />
      <ButtonUp />
      <CertificateMovementItems />
    </Box>
  );
}
