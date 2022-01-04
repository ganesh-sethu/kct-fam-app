import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Alert,
  Button,
  LinearProgress,
  Divider,
  Paper,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import apiEndPoints from "../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function BasicModal({ setOpen, open, request, updateRequests }) {
  const [reject, setReject] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setReject(false);
    setOpen("");
  };

  const rejectHandler = () => {
    setLoad(true);
    setError(false);
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .put(
          apiEndPoints.rejectRequest,
          {
            requestId: request.request_id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setLoad(false);
          console.log(res.data);
          setReject(true);
        })
        .catch((err) => {
          setLoad(false);
          setError(true);
          console.log(err);
          if (err.response) console.log(err.response);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {reject ? (
        <Paper sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon
              color="error"
              fontSize="large"
              sx={{ marginTop: "1rem", transform: "scale(1.8)" }}
            />
            <h2>Event rejected</h2>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                updateRequests(request.request_id);
              }}
            >
              Done
            </Button>
          </div>
        </Paper>
      ) : (
        <Paper sx={style}>
          {load ? <LinearProgress /> : undefined}
          <h3>Confirm rejection !</h3>
          <Divider />
          <p>
            Are you sure ? You are rejecting the event{" "}
            {request.event_info && request.event_info.name
              ? request.event_info.name
              : " "}{" "}
            by {request.name}
          </p>
          <TextareaAutosize
            minRows={5}
            placeholder={
              "Reason for rejection (optional)"
            }
            style={{ width: "100%" }}
          />

          {error ? (
            <Alert variant="filled" severity="error" sx={{ margin: "1rem 0" }}>
              Error rejecting request ! try later.
            </Alert>
          ) : undefined}
          <Button
            sx={{ marginTop: "1rem", marginRight: "1rem" }}
            variant="contained"
            color="success"
            onClick={rejectHandler}
          >
            Reject
          </Button>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Paper>
      )}
    </Modal>
  );
}
