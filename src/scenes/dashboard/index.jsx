// src/scenes/dashboard/index.jsx
//--------> Used to create the 'Dashboard' or home screen

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import FlightIcon from "@mui/icons-material/Flight";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Hardcoded mock data for Recent Job Requests
  const mockJobRequests = [
    {
      jobId: "INSP-001",
      requester: "Aircraft-14",
      date: "2023-11-01",
      status: "Pending",
    },
    {
      jobId: "FEAC-002",
      requester: "Aircraft-24",
      date: "2023-11-02",
      status: "In Progress",
    },
    {
      jobId: "ABAC-003",
      requester: "Aircraft-1",
      date: "2023-11-03",
      status: "Completed",
    },
    {
      jobId: "LUB-004",
      requester: "Aircraft-21",
      date: "2023-11-04",
      status: "Pending",
    },
    {
      jobId: "TEST-005",
      requester: "Aircraft-36",
      date: "2023-11-05",
      status: "In Progress",
    },
  ];

  return (
    <Box m="20px">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtile="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Grid & Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="55"
            subtitle="Mission Capable Aircraft"
            progress={(55 / (55 + 27)).toFixed(2)} // Calculating readiness ratio
            increase={`${((55 / (55 + 27)) * 100 - 100).toFixed(0)}%`} // Calculating increase percentage
            icon={
              <AirplaneTicketIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              /> // Readiness icon
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="639"
            subtitle="FY Jobs Execution"
            progress={(639 / 738).toFixed(2)} // Calculating progress ratio
            increase={`${((639 / 738) * 100 - 100).toFixed(0)}%`} // Calculating increase percentage
            icon={
              <CheckCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              /> // Replace with a checkmark icon
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="82"
            subtitle="Squadron Aircraft Count"
            progress={(82 / 86).toFixed(2)} // Calculating progress ratio
            increase={`${((82 / 86) * 100 - 100).toFixed(0)}%`} // Calculating increase percentage
            icon={
              <FlightIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              /> // Aircraft icon
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="238"
            subtitle="Technicians"
            progress={(238 / 298).toFixed(2)} // Calculating progress ratio
            increase={`${((238 / 298) * 100 - 100).toFixed(0)}%`} // Calculating increase percentage
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              /> // Replace with a person icon
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Task Count
              </Typography>
              <Typography
                variant="h7"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Block Type (Ordered by Total Count) and Year
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "25px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Recent Job Requests Component */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Job Requests
            </Typography>
          </Box>
          {mockJobRequests.map((job, i) => (
            <Box
              key={`${job.jobId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {job.jobId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {job.requester}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{job.date}</Box>
              <Box
                sx={{
                  backgroundColor:
                    job.status === "Completed"
                      ? colors.greenAccent[500]
                      : job.status === "Pending"
                      ? colors.grey[500]
                      : "#E1BEE7",
                  color: colors.grey[100],
                  p: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                {job.status}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Task Distribution by Aircraft
          </Typography>
          <Box height="250px" mt="20px">
            <PieChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Workload Distribution
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
