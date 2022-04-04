import React from "react";
import Select from "./Select/Select";
import { Divider, Paper, Button, Alert } from "@mui/material";
import TextField from "./TextField/TextField";
import TextArea from "./TextArea/TextArea";
import formFields from "../../common/formFields";
import axios from "axios";
import apiEndPoints from "../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";

export default function NewEvent() {
  const [formData, setFormData] = React.useState({
    [formFields.eventType]: "Organize event",
    [formFields.facultyInCharge]: "",
    [formFields.title]: "",
    [formFields.venue]: "",
    [formFields.purpose]: "",
    [formFields.from]: "",
    [formFields.to]: "",
    [formFields.details]: "",
    [formFields.budget]: "",
  });
  const [alert, setAlert] = React.useState(undefined);
  const navigate = useNavigate();
  const eventTypes = ["Organize event", "Attend event"];

  const handleSubmit = () => {
    console.log(formData);
    setAlert(undefined);
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          apiEndPoints.postRequest,
          {
            ...formData,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setAlert(
            <Alert
              sx={{ marginTop: "1rem" }}
              variant="filled"
              severity="success"
            >
              Request sent successfully
            </Alert>
          );
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setAlert(
            <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="error">
              Error sending request.Try later
            </Alert>
          );
        });
    } else {
      navigate("/login");
    }
  };

  return (
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
        <TextField
          formData={formData}
          setFormData={setFormData}
          name={formFields.from}
          initialValue=""
        />
        <TextField
          formData={formData}
          setFormData={setFormData}
          name={formFields.to}
          initialValue=""
        />
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
  );
}
