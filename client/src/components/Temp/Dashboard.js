import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Divider, Paper } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "1rem",
    },
    lower: {
      width: "100%",

      padding: "1rem",
    },
    upper: {
      width: "100%",
      display: "flex",
      gap: "20px",
      justifyContent: "space-between",
      height: "45vh",
      padding: "1rem",
    },
    left: {
      width: "50%",
      padding: "0.5rem",
    },
    right: {
      width: "50%",
      padding: "1rem",
    },
  })
);
export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.upper}>
        <Paper className={classes.left} elevation={3}>
          <h4>Pending Requests</h4>
          <Divider />
          <Paper
            className={classes.request}
            sx={{
              padding: "0.5rem",
              background: "#E8EAF6",
              fontSize: "14px",
              marginTop: "1rem",
            }}
          >
            <h3>AI Workshop</h3>
            <p>10 jan 2022 - 11 Jan 2022</p>
            <p>Organized by John from CSE dept</p>
          </Paper>
        </Paper>
        <Paper className={classes.right} elevation={3}>
          <h4>Events</h4>
          <Divider />
          <p style={{ marginTop: "5rem", textAlign: "center" }}>
            No upcoming events
          </p>
        </Paper>
      </div>
      <Paper className={classes.lower} elevation={3}>
        <h3>Budget status</h3>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Allocated Budget - &#8377; 1,00,000 </h4>
          <h4>Department - Computer Science and Engineering</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "green" }}>
            Available Budget - &#8377; 1,00,000{" "}
          </h2>
          <h2 style={{ color: "red" }}>Used Budget - &#8377; 0</h2>
        </div>
      </Paper>
    </div>
  );
}
