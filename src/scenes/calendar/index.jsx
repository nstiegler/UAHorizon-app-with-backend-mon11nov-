import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormHelperText,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";

// Validation schema
const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  clientName: yup.string().required("Client name is required"),
  location: yup.string().required("Location is required"),
  priority: yup.string().required("Priority is required"),
  technician: yup.string().required("Technician name is required"),
  startTime: yup.string().required("Start time is required"),
  duration: yup
    .number()
    .required("Duration is required")
    .positive("Must be a positive number")
    .typeError("Duration must be a number"),
  serviceType: yup.string().required("Service type is required"),
});

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
  };

  const handleJobSubmit = (values, { resetForm }) => {
    if (selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      // Define priority colors
      const priorityColors = {
        low: colors.greenAccent[500],
        medium: colors.blueAccent[500],
        high: colors.redAccent[500],
        emergency: colors.redAccent[700],
      };

      // Calculate start and end times
      const dateStr = selectedDate.startStr.split("T")[0]; // Get just the date part
      const startDateTime = `${dateStr}T${values.startTime}:00`;

      // Calculate end time by adding duration hours
      const endDateTime = new Date(
        new Date(startDateTime).getTime() + values.duration * 60 * 60 * 1000
      ).toISOString();

      // Create the event
      calendarApi.addEvent({
        id: `${selectedDate.dateStr}-${values.title}`,
        title: `${values.title} - ${values.clientName}`,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        backgroundColor:
          priorityColors[values.priority] || colors.blueAccent[500],
        extendedProps: {
          ...values,
        },
      });

      // Reset form and close dialog
      resetForm();
      handleDialogClose();
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the job '${selected.event.title}'?`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Job Calendar"
        subtitle="Interactive calendar for scheduling jobs"
      />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Scheduled Jobs</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor:
                    event.backgroundColor || colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      <br />
                      Technician: {event.extendedProps?.technician || "N/A"}
                      <br />
                      Priority: {event.extendedProps?.priority || "N/A"}
                      <br />
                      Duration: {event.extendedProps?.duration || "N/A"} hours
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
          />
        </Box>
      </Box>

      {/* JOB SCHEDULING DIALOG */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Schedule New Service Job</DialogTitle>
        <Formik
          initialValues={{
            title: "",
            clientName: "",
            location: "",
            priority: "medium",
            technician: "",
            startTime: "",
            duration: "",
            serviceType: "",
          }}
          validationSchema={jobSchema}
          onSubmit={handleJobSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Job Title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Client Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.clientName}
                        name="clientName"
                        error={!!touched.clientName && !!errors.clientName}
                        helperText={touched.clientName && errors.clientName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={!!touched.location && !!errors.location}
                        helperText={touched.location && errors.location}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        variant="filled"
                        error={!!touched.priority && !!errors.priority}
                      >
                        <InputLabel>Priority</InputLabel>
                        <Select
                          value={values.priority}
                          name="priority"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value="low">Low</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="high">High</MenuItem>
                          <MenuItem value="emergency">Emergency</MenuItem>
                        </Select>
                        {touched.priority && errors.priority && (
                          <FormHelperText>{errors.priority}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Technician Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.technician}
                        name="technician"
                        error={!!touched.technician && !!errors.technician}
                        helperText={touched.technician && errors.technician}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="time"
                        label="Start Time"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }} // 5-minute intervals
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startTime}
                        name="startTime"
                        error={!!touched.startTime && !!errors.startTime}
                        helperText={touched.startTime && errors.startTime}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Estimated Duration (hours)"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.duration}
                        name="duration"
                        error={!!touched.duration && !!errors.duration}
                        helperText={touched.duration && errors.duration}
                        inputProps={{ step: "0.5", min: "0.5" }} // Allow half-hour increments
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth
                        variant="filled"
                        error={!!touched.serviceType && !!errors.serviceType}
                      >
                        <InputLabel>Service Type</InputLabel>
                        <Select
                          value={values.serviceType}
                          name="serviceType"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          <MenuItem value="Maintenance">Maintenance</MenuItem>
                          <MenuItem value="Repair">Repair</MenuItem>
                          <MenuItem value="Installation">Installation</MenuItem>
                          <MenuItem value="Inspection">Inspection</MenuItem>
                        </Select>
                        {touched.serviceType && errors.serviceType && (
                          <FormHelperText>{errors.serviceType}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={!(isValid && dirty)}
                >
                  Schedule Job
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Calendar;
