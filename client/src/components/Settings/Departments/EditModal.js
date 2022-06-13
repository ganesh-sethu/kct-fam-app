import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';
import apiEndPoints from '../../../common/apiEndPoints';
import { useNavigate } from "react-router-dom";

import axios from 'axios';


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



export default function AlertDialog({editModal,setEditModal,department,setValue}) {
  const [dept,setDept] = React.useState({
    department_name : "",
    allocated_budget : 0,
    budget_used: 0,
    department:""
  })
  const [isUpdated,setIsUpdated] = React.useState(false)
  const navigate = useNavigate();
  const classes = useStyles()
  const handleClose = () => {
    setEditModal(false);
  };
  const [content,setContent] = React.useState("")
  React.useEffect(() => {
    setDept(department)
  },[department])




  const handleSubmit = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .put(
          apiEndPoints.getDepartments,
          {
            ...dept
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setIsUpdated(true)
          setContent("Department Details updated")
        })
        .catch((err) => {
          console.log(err.response)
          alert("Couldn't update! try later")
        });
    } else {
      navigate("/login");
    }
  
  }

  const handleDelete = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          apiEndPoints.deleteDepartment,
          {
            ...dept
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setIsUpdated(true)
          setContent("Deleted Successfully")
        })
        .catch((err) => {
          console.log(err.response)
          alert("Couldn't Delete! try later")
        });
    } else {
      navigate("/login");

  }
}


  const defaultContent = () => {
    return <>
    <DialogContent>
          <div className={classes.container}>
              <p className={classes.label}>Department Name : </p>
              <TextField name="name"  value={dept.department_name}  onChange={(e) => setDept({...dept,department_name : e.target.value})} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Allocated Budget : </p>
              <TextField type="number" name="allocatedBudget"  value={dept.allocated_budget} onChange={(e) => setDept({...dept,allocated_budget: e.target.value})} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Used Budget : </p>
              <TextField type="number" name="usedBudget"value={dept.budget_used} onChange={(e) => setDept({...dept,budget_used: e.target.value})}  />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="info" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSubmit} autoFocus>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} >
            Delete
          </Button>
        </DialogActions>
    </>
  }


  const updatedContent = () => {
    return <>
      <DialogContent>
         <p>{content}</p>
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
        open={editModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { isUpdated ? updatedContent() : defaultContent() }
        </DialogTitle>
        
      </Dialog>
    </div>
  );
}
