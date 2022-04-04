import React from "react";

import { Button, Divider, Paper } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import RejectModal from "../Modal/RejectModal";
import ApproveModal from "../Modal/ApproveModal";
import formFields from "../../common/formFields";

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
export default function Requests({ requests, updateRequests }) {
  const classes = useStyles();
  const [showMore, setShowMore] = React.useState(null);
  const [approve, setApprove] = React.useState("");
  const [reject, setReject] = React.useState("");

  const handleShowMore = (reqId) => {
    if (showMore === reqId) setShowMore(null);
    else setShowMore(reqId);
  };

  return (
    <div>
      <h3>Pending Requests </h3>
      <Divider />

      {requests && requests.length ? (
        requests.map((item) => (
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
                <h1> &#8377; {item.event_info.budget}</h1>
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
            <div className={classes.btns}>
              <Button
                sx={{ marginRight: "1rem" }}
                variant="contained"
                color="success"
                onClick={() => {
                  setApprove(item.request_id);
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setReject(item.request_id);
                }}
              >
                Reject
              </Button>
            </div>
            <ApproveModal
              open={approve === item.request_id}
              setOpen={setApprove}
              request={item}
              requests={requests}
              updateRequests={updateRequests}
            />
            <RejectModal
              open={reject === item.request_id}
              setOpen={setReject}
              request={item}
              requests={requests}
              updateRequests={updateRequests}
            />
          </Paper>
        ))
      ) : (
        <h3>No pending requests found !</h3>
      )}
    </div>
  );
}
