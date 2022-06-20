import axios from "axios";
import React from "react";
import apiEndPoints from "../../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";
import {  Divider, Paper } from "@mui/material";
import formFields from "../../../common/formFields";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
    paper: {
      padding: "1rem",
      marginTop: "1rem",
    },
    container2: {
      display: "flex",
      justifyContent: "space-between",
    },
    showMore: {
      color: "#083d8d",
      "&:hover": { cursor: "pointer" },
    },
    details: {
      padding: "1rem",
      marginBottom: "1rem",
    },
    btns: {
      display: "flex",
      paddingTop: "0.5rem",
      width: "100%",
    },
  })
);

export default function UpcomingEvents() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const [showMore, setShowMore] = React.useState(null);
  
  const handleShowMore = (reqId) => {
    if (showMore === reqId) setShowMore(null);
    else setShowMore(reqId);
  };


  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(apiEndPoints.getUpComingEvents, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setEvents(res.data.events);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  if (events && events.length) {
    return (
      <div>
        {events.map((item, i) => {
          return (
            <Paper
            className={classes.paper}
            key={item.request_id}
            sx={{ background: "#f5f5f5" }}
          >
            <div className={classes.container2}>
              <div>
                <h3>
                  {item.event_info[formFields.title]
                    ? item.event_info[formFields.title]
                    : "Event Name"}
                </h3>
                <p>
                  by {item.name} from {item.department_name}
                </p>
              </div>
              <div>
                <h1> &#8377; {item.event_info.Budget}</h1>
              </div>
            </div>
            <p
              className={classes.showMore}
              onClick={() => handleShowMore(item.request_id)}
            >
              {showMore === item.request_id ? "Show less" : "Show More"}
            </p>
            <Paper
              elevation={3}
              className={classes.details}
              style={{
                display: showMore === item.request_id ? "inherit" : "none",
              }}
            >
              <p className={classes.detailsTypo}>
                {" "}
                <b>User name : </b> {item.name}{" "}
              </p>
              <p className={classes.detailsTypo}>
                {" "}
                <b> Department : </b> {item.department_name}{" "}
              </p>
              {Object.keys(item.event_info).map((key) => {
                return (
                  <p className={classes.detailsTypo} key={key}>
                    {" "}
                    <b>{key} : </b>{" "}
                    {key === "budget" ? <>&#8377;</> : undefined}
                    {item.event_info[key]}{" "}
                  </p>
                );
              })}
            </Paper>
            <Divider />
          </Paper>
          );
        })}
      </div>
    );
  } else {
    return <div>No upcoming events</div>;
  }
}
