import axios from "axios";
import React from "react";
import apiEndPoints from "../../../common/apiEndPoints";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import formFields from "../../../common/formFields";
import { createStyles, makeStyles } from "@mui/styles";
import common from "../../../common/functions"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {saveAs} from "file-saver"


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
    bottomWrapper:{
      display:"flex",
      width:"100%",
      justifyContent:"space-between"
    },
    proofBtns:{
      display:"flex",
      gap:"2rem"
    }
  })
);

export default function UpcomingEvents() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const [showMore, setShowMore] = React.useState(null);
  const [user,setUser] = React.useState({})
  const [proof,setProof] = React.useState()
  const [open, setOpen] = React.useState(false);
  const [selectedEvent,setSelectedEvent] = React.useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleProofUpload();
    handleClose()
  }


  const handleShowMore = (reqId) => {
    if (showMore === reqId) setShowMore(null);
    else setShowMore(reqId);
  };


  const handleProofUpload = () => {
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("file",proof)
    for ( var key in selectedEvent ) {
      formData.append(key, selectedEvent[key]);
    }
    if (token) {
      axios
        .post(apiEndPoints.submitProof,formData,{
          headers: {
            Authorization: token,
            'Content-Type':'multipart/form-data'
          },
        })
        .then((res) => {
          console.log(res.data)
          setTimeout(() => {
            window.location.reload()
            
          }, 1000);
          
        })
        .catch((err) => {
          alert("Error occured ! try later")
        });
    } else {
      navigate("/login");
    }


  }

  const handleFileUpload = (e,req) => {
    setProof(e.target.files[0])
    setSelectedEvent(req)
    handleClickOpen()
     
  }

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(apiEndPoints.getCompletedEvents, {
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

    let userCache = localStorage.getItem("user")
    let userJson = JSON.parse(userCache);
    if(userJson && userJson.emp_id){
        setUser(userJson)
    }
    // eslint-disable-next-line
  }, []);


  const getProof = (req) => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(apiEndPoints.submitProof+"?request_id="+req.request_id,
        {
          headers: {
            Authorization: token
          },
          responseType: 'blob'
        })
        .then((res) => {
              var a = document.createElement("a");
              var url = window.URL.createObjectURL(res.data);
              a.href = url;
              // a.download = "proof.pdf";
              a.target = "_blank"
              document.body.append(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err)
          alert("Error occured ! try later")
        });
    } else {
      navigate("/login");
    }

  }

  const deleteProof = (req) => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post(apiEndPoints.deleteProof,{
          ...req
        },
        {
          headers: {
            Authorization: token
          }
          
        })
        .then((res) => {
              console.log(res.data)
              setTimeout(() => {
                window.location.reload()
                
              }, 1000);
        })
        .catch((err) => {
          console.log(err)
          alert("Error occured ! try later")
        });
    } else {
      navigate("/login");
    }

  }

  const getProofContent = (req) => {
    

    let userType = common.userType(req,user)
    // console.log(req)
    // console.log(user)
    // console.log(userType)
    if(userType === 1){
      if(req.proof && req.proof != null)
        return <div className={classes.proofBtns}>
          <Typography variant="subtitle1" color="green">Proof uploaded</Typography>
          <Button
            variant="contained"
            component="label"
          >
            Edit proof
            <input
              type="file"
              accept="application/pdf" 
              hidden
              onChange={(e) => handleFileUpload(e,req)}
            />
          </Button>
        </div>
      else 
        return ( 
          <Button
            variant="contained"
            component="label"
            
          >
            Upload File
            <input
              type="file"
              accept="application/pdf" 
              hidden
              onChange={(e) => handleFileUpload(e,req)}
            />
          </Button>

        )
    }
    else if(userType === 2){
      if(req.proof && req.proof != null)
        return <div className={classes.proofBtns}>
         <Button
          variant="contained"
          component="label"
          color="info"
          onClick={(e) => getProof(req) }
        >
          View proof
        </Button>
        <Button
          variant="contained"
          component="label"
          color="error"
          onClick={(e) => deleteProof(req)}
        >
         Remove Proof
        </Button>
      </div>
      else 
        return (
          <Typography variant="subtitle1" color="red">Proof not uploaded</Typography>
        )
    }
    else {
      return undefined
    }

  }



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
            <div className={classes.bottomWrapper}>
              <p
                className={classes.showMore}
                onClick={() => handleShowMore(item.request_id)}
              >
                {showMore === item.request_id ? "Show less" : "Show More"}
              </p>
              <div className={classes.uploadProof}>
                {
                  getProofContent(item)
                }
              </div>
             
            </div>
           
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm proof submission
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               Are you sure? The selected file will be submitted as event proof
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  } else {
    return <div>No completed events</div>;
  }
}

