import ButtonPrimary from "@/components/buttons/buttonPrimary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useModalStore from "@/store/userModalStore";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 240, sm: 450, md: 650 },
  bgcolor: "background.default",
  borderRadius: "40px",
  py: { xs: 2, md: 4 },
  px: { xs: 2, md: 8 },
  border: "3px solid",
  borderColor: "common.two",
};

export default function ModalGlobal(props) {
  const { open, title, message, setStateModalGlobal } = useModalStore();

  const handleClose = () => {
    const open = false;
    const title = "nothing";
    const message = "nothing";

    setStateModalGlobal(open, title, message);
  };

  const StylesTittle = {
    textAlign: "center",
    color: "text.secondary",
    fontStyle: "normal",
    fontSize: { xs: 16, sm: 22, md: 23, lg: 24, xl: 25 },
    fontWeight: "800",
    mb: { xs: 1, md: 2 },
  };

  const StylesParagraph = {
    textAlign: "center",
    color: "text.secondary",
    fontStyle: "normal",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0,0,0,0.00)",
          },
        }}
      >
        <Box sx={style}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <Typography sx={StylesTittle}>{title}</Typography>
            </Grid>
            <Grid item xs={12} alignSelf={"center"}>
              <Typography variant="h3" sx={StylesParagraph}>
                {message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ButtonPrimary width="100%" onClick={handleClose}>
                Close
              </ButtonPrimary>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
