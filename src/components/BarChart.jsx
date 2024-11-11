// src/components/BarChart.jsx
//--------> Used to create the bar chart

import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { chartData as data, blockTypes } from "../data/mockData"; // Updated import

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            padding: 12,
            background: colors.primary[400],
            color: colors.grey[100],
            border: `1px solid ${colors.primary[500]}`,
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 4 }}>
            {indexValue} - {id}
          </div>
          <div>Number of Tasks: {value}</div>
        </div>
      )}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={blockTypes} // (Exported from mockdata) Using the block types array: ['INSP', 'FEAC', 'ABAC', 'LUB', 'TEST', 'TF', 'TP']
      indexBy="skill"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => {
        const colorMap = {
          INSP: "#e8c1a0",
          FEAC: "#f47560",
          ABAC: "#f1e15b",
          LUB: "#61cdbb",
          TEST: "#97e3d5",
          TF: "#ff8c00",
          TP: "#d6a2e8",
        };
        return colorMap[id] || "#000000"; // default to black if id is not found
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45, // Changed to -45 to handle longer skill names
        legend: isDashboard ? undefined : "Skill Category", // Updated legend
        legendPosition: "middle",
        legendOffset: 40, // Increased to accommodate rotated labels
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Tasks",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return (
          e.id + ": " + e.formattedValue + " in skill category: " + e.indexValue
        );
      }}
    />
  );
};

export default BarChart;
