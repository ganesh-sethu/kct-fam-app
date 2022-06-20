import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { MenuItem, Select, TextField } from '@mui/material';
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
      width:"50%"

    }
  })
);



export default function AlertDialog({editModal,setEditModal,user,departments}) {
  console.log(user)
  const classes = useStyles()
  const [currUser,setCurrUser] = React.useState({
    emp_id:"",
    email:"",
    name:"",
    department:"",
    designation:""

  })
  const [isUpdated,setIsUpdated] = React.useState(false)
  const navigate = useNavigate();
  const [content,setContent] = React.useState("")
  const handleClose = () => {
    setEditModal(false);
  };

  React.useEffect(() => {
    setCurrUser(user)
  },[user])

  const handleSubmit = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .put(
          apiEndPoints.getUser,
          {
            ...currUser
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setIsUpdated(true)
          setContent("User Details updated")
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
          apiEndPoints.deleteUser,
          {
            ...currUser
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

  return  <Dialog
            open={editModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              
            </DialogTitle>
            <DialogContent>
              <div className={classes.container}>
                  <p className={classes.label}>Employee Id : </p>
                  <TextField className={classes.field} name="empId" value={currUser.emp_id} disabled/>
              </div>
              <div className={classes.container}>
                  <p className={classes.label}>Name : </p>
                  <TextField className={classes.field}  name="name" value={currUser.name} onChange={(e) => setCurrUser({...currUser,name:e.target.value})}/>
              </div>
              <div className={classes.container}>
                  <p className={classes.label}>Department : </p>
                  <Select
                    value={currUser.department}
                    // onChange={(e) => setDepartment(e.target.value)}
                    onChange={(e) => setCurrUser({...currUser,department:e.target.value})}
                    className={classes.field}
                    
                  >
                    {departments.map((dept) => {
                      return <MenuItem key={dept.department} value={dept.department}>{dept.department_name}</MenuItem>

                    })}
                  
                  </Select>
              </div>
              <div className={classes.container}>
                  <p className={classes.label}>Email : </p>
                  <TextField  className={classes.field} name="usedBudget" value={currUser.email} onChange={(e) => setCurrUser({...currUser,email:e.target.value})}/>
              </div>
              <div className={classes.container}>
                  <p className={classes.label}>Designation : </p>
                  <Select
                    value={user.designation}
                    // onChange={(e) => {setDesignation(e.target.value)}}
                    onChange={(e) => setCurrUser({...currUser,designation:e.target.value})}
                    className={classes.field}
                    
                  >
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                    <MenuItem value={"STAFF"}>Staff</MenuItem>
                    <MenuItem value={"BUDGET"}>Budget Co-ordinator</MenuItem>
                    <MenuItem value={"HOD"}>HOD</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"ARCH_DEPT"}>Archival </MenuItem>
                    <MenuItem value={"PRINCIPAL"}>Principal</MenuItem>
                  </Select>
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
          </Dialog>

}

const updatedContent = () => {
  return <Dialog 
          open={editModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogContent>
                <p>{content}</p>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="success" onClick={() => {
                  window.location.reload()
                }}>Ok</Button>
              </DialogActions>
          </Dialog>
}


  return (
    <div>
      { isUpdated ? updatedContent() : defaultContent() }
    </div>
  );
}
