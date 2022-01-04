import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Select from "./Select/Select";
import TextField from "./TextField/TextField";
import { Divider, Paper } from "@mui/material";
import EventOrganized from "./EventOrganized";

const useStyles = makeStyles((theme) => createStyles({}));

export default function NewEvent() {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({});
  const [formContent, setFormContent] = React.useState(undefined);
  const eventTypes = [
    "Events Organized",
    "Awards/Recognition achieved",
    "Outreach-Faculty as resource person",
    "Events Attended",
    "Online Certification",
    "Research",
  ];
  React.useEffect(() => {
    if (formData["Event Type"] === eventTypes[0]) {
      setFormContent(
        <EventOrganized formData={formData} setFormData={setFormData} />
      );
    } else setFormContent(undefined);
    // eslint-disable-next-line
  }, [formData["Event Type"]]);

  return (
    <div>
      <h3>Enter Event Details</h3>
      <Divider />
      <Paper sx={{ padding: "2rem" }}>
        <Select
          formData={formData}
          setFormData={setFormData}
          name="Event Type"
          menuItems={eventTypes}
          initialValue=""
        />
        {formContent}
      </Paper>
    </div>
  );
}
