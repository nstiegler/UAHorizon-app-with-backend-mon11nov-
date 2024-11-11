// src/scenes/line/index.jsx
//--------> Used to create the 'line chart' screen

import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <Header
        title="Task Count"
        subtitle="Block Type (Ordered by Total Count) and Year"
      />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
