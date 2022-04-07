import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Divider, Paper } from "@mui/material";
import Budget from "../Budget/Budget";

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
export default function Dashboard({requests,events,department}) {
  const classes = useStyles();
  console.log(department)
  return (
    <div className={classes.root}>
      <div className={classes.upper}>
        <Paper className={classes.left} elevation={3} sx={{overflowY:"auto"}}>
          <h4>Pending Requests</h4>
          <Divider />
          {
            requests && requests.length? 
              <>
              {requests.map((item,i) => {
                return (
                  <Paper
                    key={i}
                    className={classes.request}
                    sx={{
                      padding: "0.5rem",
                      background: "#E8EAF6",
                      fontSize: "14px",
                      marginTop: "1rem",
                    }}
                    >
                    <h3>{item.event_info["Title of the Programme"]}</h3>
                    <p>{item.event_info["From"]} - {item.event_info["To"]}</p>
                    <p>{item.event_info["Event Type"]} by {item.name}</p>
                </Paper>
                )
              })}
              </>
            :<p>No Pending Requests</p>
          }
          
        </Paper>
        <Paper className={classes.left} elevation={3} sx={{overflowY:"auto"}}>
          <h4>Upcoming Events</h4>
          <Divider />
          {
            events && events.length? 
              <>
              {events.map((item,i) => {
                return (
                  <Paper
                    key={i}
                    className={classes.request}
                    sx={{
                      padding: "0.5rem",
                      background: "#E8EAF6",
                      fontSize: "14px",
                      marginTop: "1rem",
                    }}
                    >
                    <h3>{item.event_info["Title of the Programme"]}</h3>
                    <p>{item.event_info["From"]} - {item.event_info["To"]}</p>
                    <p>{item.event_info["Event Type"]} by {item.name}</p>
                </Paper>
                )
              })}
              </>
            :<p>No Upcoming events</p>
          }
          
        </Paper>
      </div>
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
