import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Upcoming from "./Upcoming/UpcomingEvents";
import Previous from "./Previous/PreviousEvents";
const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    toolbar: {
      display: "flex",
      flexDirection: "row-reverse",
      marginBottom: "1rem",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(props.value === "upcoming" ? 0 : 1);
  const navigate = useNavigate();

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue === 0) navigate("/events/upcoming");
    else navigate("/events/previous");
  };

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <Button variant="contained" onClick={() => navigate("/events/new")}>
          New Event
        </Button>
      </div>
      <Divider />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Upcoming" {...a11yProps(0)} />
            <Tab label="Completed Events" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Upcoming />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Previous />
        </TabPanel>
      </Box>
    </div>
  );
}
