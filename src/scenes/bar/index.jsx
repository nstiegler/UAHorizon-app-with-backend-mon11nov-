// src/scenes/bar/index.jsx
//--------> Used to create the 'bar chart' screen

import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header
        title="Workload Distribution"
        subtitle="Distribution of maintenance task by skill type"
      />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
