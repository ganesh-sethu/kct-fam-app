import React from "react";
import Select from "./Select/Select";
import { Divider, Paper, Button, Alert, FormControl } from "@mui/material";
import TextField from "./TextField/TextField";
import TextArea from "./TextArea/TextArea";
import formFields from "../../common/formFields";
import axios from "axios";
import apiEndPoints from "../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    label: {
      width: "20%",
    },
    textField: {
      width: "75%",
    },
    colon: {
      width: "5%",
    },
  })
);

export default function NewEvent() {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    [formFields.eventType]: "Organize event",
    [formFields.facultyInCharge]: "",
    [formFields.title]: "",
    [formFields.venue]: "",
    [formFields.purpose]: "",
    [formFields.from]: new Date(),
    [formFields.to]: new Date(),
    [formFields.details]: "",
    [formFields.budget]: "",
  });
  const [alert, setAlert] = React.useState(undefined);
  const navigate = useNavigate();
  const eventTypes = ["Organize event", "Attend event"];

  const handleSubmit = () => {
    console.log(formData);
    // setAlert(undefined);
    // let token = localStorage.getItem("token");
    // if (token) {
    //   axios
    //     .post(
    //       apiEndPoints.postRequest,
    //       {
    //         ...formData,
    //       },
    //       {
    //         headers: {
    //           Authorization: token,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       setAlert(
    //         <Alert
    //           sx={{ marginTop: "1rem" }}
    //           variant="filled"
    //           severity="success"
    //         >
    //           Request sent successfully
    //         </Alert>
    //       );
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setAlert(
    //         <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="error">
    //           Error sending request.Try later
    //         </Alert>
    //       );
    //     });
    // } else {
    //   navigate("/login");
    // }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <h3>Enter Event Details</h3>
        <Divider />
        <Paper sx={{ padding: "2rem" }}>
          <Select
            formData={formData}
            setFormData={setFormData}
            name={formFields.eventType}
            menuItems={eventTypes}
            initialValue="Organize event"
          />
          <TextField
            formData={formData}
            setFormData={setFormData}
            name={formFields.facultyInCharge}
            initialValue=""
          />
          <TextField
            formData={formData}
            setFormData={setFormData}
            name={formFields.title}
            initialValue=""
          />
          <TextField
            formData={formData}
            setFormData={setFormData}
            name={formFields.venue}
            initialValue=""
          />
          <TextArea
            formData={formData}
            setFormData={setFormData}
            name={formFields.details}
            initialValue=""
          />
          <TextArea
            formData={formData}
            setFormData={setFormData}
            name={formFields.purpose}
            initialValue=""
          />
          <TextField
            formData={formData}
            setFormData={setFormData}
            name={formFields.budget}
            initialValue=""
          />
          <FormControl
            className={classes.container}
            sx={{ flexDirection: "row", gap: "1rem", marginTop: "1rem" }}
          >
            <p className={classes.label}>From </p>
            <p className={classes.colon}>:</p>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={formData.from}
              onChange={(val) => setFormData({ ...formData, from: val })}
              renderInput={(params) => (
                <DateTextField {...params} sx={{ width: "75%" }} />
              )}
              className={classes.textField}
              sx={{ marginTop: "1rem" }}
            />
          </FormControl>
          <FormControl
            className={classes.container}
            sx={{ flexDirection: "row", gap: "1rem", marginTop: "1rem" }}
          >
            <p className={classes.label}>To </p>
            <p className={classes.colon}>:</p>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={formData.to}
              onChange={(val) => setFormData({ ...formData, to: val })}
              renderInput={(params) => (
                <DateTextField {...params} sx={{ width: "75%" }} />
              )}
              className={classes.textField}
              sx={{ marginTop: "1rem" }}
            />
          </FormControl>
          <div>
            <Button
              style={{ width: "100%", marginTop: "1rem" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          {alert}
        </Paper>
      </div>
    </LocalizationProvider>
  );
}
