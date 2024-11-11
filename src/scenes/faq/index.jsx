// src/scenes/faq/index.jsx
//--------> Used to create the 'FAQ' screen

import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // creating the box that will contain all of the FAQ's
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently asked questions page" />
      {/* The parent accordion that contains the question and answer for each item (each 'accordion' set is a different question) */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I am an important questions #1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>random text to question 1 goes here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I am an important questions #2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>random text to question 2 goes here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I am an important questions #3
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>random text to question 3 goes here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I am an important questions #4
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>random text to question 4 goes here</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I am an important questions #5
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>random text to question 5 goes here</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
