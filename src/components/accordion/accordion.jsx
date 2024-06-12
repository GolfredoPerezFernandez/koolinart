import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function tabsAccordion(props) {
  return (
    <Accordion
      defaultExpanded={props.expand ? true : false} // Añade esta línea
      sx={{
        backgroundColor: "transparent",
        borderRadius: "10px",
        border: "3px solid",
        borderColor: "secondary.icon",
        width: "inherit",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ borderRadius: "10px" }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {props.tittle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: { xs: "15px 0px", md: "30px" } }}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}
