import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';
import axios from 'axios';
import apiEndPoints from '../../../common/apiEndPoints';
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles((theme) =>
  createStyles({
    container:{
        display:"flex",
        margin:"2rem 0"

    },
    label:{
        width:"50%"

    },
    field:{

    }
  })
);



export default function AlertDialog({addModal,setAddModal}) {
  const classes = useStyles()
  const [isUpdated,setIsUpdated] = React.useState(false)
  const navigate = useNavigate();
  const [department,setDepartment] = React.useState({
    department_name : "",
    allocated_budget : 0,
    budget_used : 0
  })
  const handleClose = () => {
    setAddModal(false);
  };


  const handleSubmit = () => {
    let formData = {
      ...department,
      department : department.department_name
    }
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          apiEndPoints.addDepartment,
          {
            ...formData
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setIsUpdated(true)
        })
        .catch((err) => {
          console.log(err.response)
          alert("Couldn't update! try later")
        });
    } else {
      navigate("/login");
    }

  }

  const defaultContent = () => {
    return <>
     <DialogTitle id="alert-dialog-title">
          
          </DialogTitle>
          <DialogContent>
            <div className={classes.container}>
                <p className={classes.label}>Department Name : </p>
                <TextField name="name" value={department.department_name} onChange={(e) => setDepartment({...department,department_name : e.target.value})}/>
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Allocated Budget : </p>
                <TextField type="number" name="allocatedBudget" value={department.allocated_budget} onChange={(e) => setDepartment({...department,allocated_budget : e.target.value})} />
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Used Budget : </p>
                <TextField type="number" name="usedBudget" value={department.budget_used} onChange={(e) => setDepartment({...department,budget_used : e.target.value})}/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit} autoFocus>
              Add
            </Button>
          </DialogActions>
    </>
  }


  const updatedContent = () => {
    return <>
    <DialogContent>
       <p>Department Details Added</p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={() => {
         window.location.reload()
        }}>Ok</Button>
      </DialogActions>
  </>
  }
  return (
    <div>
      <Dialog
        open={addModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        { isUpdated ? updatedContent() : defaultContent() }
      </Dialog>
    </div>
  );
}
