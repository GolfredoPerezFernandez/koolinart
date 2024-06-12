import {
  Step,
  StepLabel,
  Stepper,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ButtonPrimary from "@/components/buttons/buttonPrimary";

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bgcolor: "#414141",
  border:"none"
`;
function StyledContainer() {
  return {
    width: { xs: "280px", sm: "400px" },
    height: "fit-content",
    bgcolor: "background.default",
    ":focus-visible": { outline: "0px " },
    p: "20px",
    borderRadius: "30px",
    ".css-8t49rw-MuiStepConnector-line": {
      borderLeftWidth: "3px",
    },
  };
}
function StyledStepper() {
  return {
    "& .MuiStepIcon-text": {
      fontSize: { xs: "17px", sm: "18px" },
      fontWeight: 500,
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: "Green",
      LetterSpacing: "0.08071em",
    },
  };
}

export default function ModalSteppper() {
  const {
    OpenStepper,
    TypeStepper,
    IndexProcess,
    ErrorProcess,
    ChangeOpenStepper,
  } = useBoundStore((state) => state, shallow);
  const handleClose = () => ChangeOpenStepper(false);
  const handleReset = () => ChangeOpenStepper(false);

  return (
    <Modal
      hideBackdrop
      open={OpenStepper}
      onClose={handleClose}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(1px)",
      }}
    >
      <Card sx={StyledContainer}>
        <CardContent>
          <Stepper activeStep={IndexProcess} orientation="vertical">
            {TypeStepper.map((valor, index) => {
              const labelProps = {};
              if (ErrorProcess && IndexProcess == index) {
                labelProps.error = true;
              }
              return (
                <Step
                  key={valor.label}
                  index={index}
                  last={index === TypeStepper.length - 1 ? true : undefined}
                >
                  <StepLabel {...labelProps} sx={StyledStepper}>
                    {valor.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {ErrorProcess ? (
            <Box>
              <ButtonPrimary onClick={handleReset} width="100%">
                Finish
              </ButtonPrimary>
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </Modal>
  );
}
