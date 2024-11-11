import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

// Transform the original data to be grouped by year instead of block type
const transformData = (originalData) => {
  // Get unique years and block types
  const years = new Set();
  const blockTypes = new Set();
  originalData.forEach((series) => {
    series.data.forEach((point) => years.add(point.x));
    blockTypes.add(series.id);
  });

  // Calculate total count per block type for sorting
  const blockTypeTotals = Array.from(blockTypes).map((blockType) => {
    const total =
      originalData
        .find((series) => series.id === blockType)
        ?.data.reduce((sum, point) => sum + point.y, 0) || 0;
    return { blockType, total };
  });

  // Sort block types by total count
  const sortedBlockTypes = blockTypeTotals
    .sort((a, b) => b.total - a.total)
    .map((item) => item.blockType);

  // Create new data structure grouped by year
  return Array.from(years).map((year) => ({
    id: year.toString(),
    data: sortedBlockTypes.map((blockType) => {
      const value =
        originalData
          .find((series) => series.id === blockType)
          ?.data.find((point) => point.x === year)?.y || 0;
      return { x: blockType, y: value };
    }),
  }));
};

// Data comes from the SS that was given apart of this challenge
const data = transformData([
  {
    id: "INSP",
    data: [
      { x: 2007, y: 1 },
      { x: 2008, y: 16 },
      { x: 2009, y: 6 },
      { x: 2010, y: 8 },
      { x: 2011, y: 6 },
      { x: 2012, y: 229 },
      { x: 2013, y: 58 },
      { x: 2014, y: 7 },
      { x: 2015, y: 141 },
      { x: 2016, y: 35 },
      { x: 2017, y: 537 },
      { x: 2018, y: 176 },
    ],
  },
  {
    id: "ABAC",
    data: [
      { x: 2008, y: 5 },
      { x: 2009, y: 3 },
      { x: 2010, y: 2 },
      { x: 2011, y: 1 },
      { x: 2012, y: 44 },
      { x: 2013, y: 12 },
      { x: 2015, y: 10 },
      { x: 2016, y: 4 },
      { x: 2017, y: 49 },
      { x: 2018, y: 10 },
    ],
  },
  {
    id: "FEAC",
    data: [
      { x: 2008, y: 3 },
      { x: 2009, y: 3 },
      { x: 2010, y: 2 },
      { x: 2011, y: 1 },
      { x: 2012, y: 46 },
      { x: 2013, y: 12 },
      { x: 2015, y: 10 },
      { x: 2016, y: 5 },
      { x: 2017, y: 48 },
      { x: 2018, y: 14 },
    ],
  },
  {
    id: "TEST",
    data: [
      { x: 2010, y: 2 },
      { x: 2011, y: 1 },
      { x: 2012, y: 3 },
      { x: 2013, y: 4 },
      { x: 2015, y: 62 },
      { x: 2016, y: 7 },
      { x: 2017, y: 85 },
      { x: 2018, y: 65 },
    ],
  },
  {
    id: "LUB",
    data: [
      { x: 2012, y: 2 },
      { x: 2013, y: 2 },
      { x: 2014, y: 1 },
      { x: 2015, y: 4 },
      { x: 2017, y: 62 },
      { x: 2018, y: 49 },
    ],
  },
  {
    id: "TP",
    data: [
      { x: 2013, y: 2 },
      { x: 2015, y: 9 },
      { x: 2017, y: 23 },
      { x: 2018, y: 11 },
    ],
  },
  {
    id: "TF",
    data: [{ x: 2018, y: 2 }],
  },
]);

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
      tooltip={({ point }) => (
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
            {point.data.x} - {point.serieId}
          </div>
          <div>Number of Tasks: {point.data.y}</div>
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={{ scheme: "category10" }} // Using a color scheme that works well for many lines
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false, // Changed to false since we want independent lines
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX" // Changed to monotoneX for smoother lines
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Block Type (Ordered by Total Count)",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Task Count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={true}
      enableGridY={true}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
