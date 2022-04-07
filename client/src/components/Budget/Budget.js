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
export default function Budget({department}) {
  const classes = useStyles();
  return (
    <div>
       <Paper className={classes.lower} elevation={3}>
          <h3>Budget status</h3>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Allocated Budget - &#8377; {department.allocated_budget} </h4>
            <h4>Department - {department.department_name}</h4>
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
              Available Budget - &#8377; {department.allocated_budget - department.budget_used}
            </h2>
            <h2 style={{ color: "red" }}>Used Budget - &#8377; {department.budget_used}</h2>
          </div>
      </Paper>
    </div>
  );
}
