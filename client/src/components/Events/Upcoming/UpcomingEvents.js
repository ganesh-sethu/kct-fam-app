import axios from "axios";
import React from "react";
import apiEndPoints from "../../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import formFields from "../../../common/formFields";

export default function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
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
          console.log(res.data.events);
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
            <Paper key={i} sx={{ padding: "1rem", background: "#f0f0f0" }}>
              <h3>{item.event_info[formFields.title]}</h3>
              <p>From : {item.event_info[formFields.from]}</p>
              <p>To : {item.event_info[formFields.to]}</p>
              <p style={{ color: "green" }}> All levels Approved </p>
            </Paper>
          );
        })}
      </div>
    );
  } else {
    return <div>No upcoming events</div>;
  }
}
