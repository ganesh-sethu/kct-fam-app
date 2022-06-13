import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { MenuItem, Select, TextField } from '@mui/material';
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
      width:"50%"

    }
  })
);



export default function AlertDialog({addModal,setAddModal,departments}) {
  const classes = useStyles()
  const [isUpdated,setIsUpdated] = React.useState(false)
  const navigate = useNavigate();
  const [user,setUser] = React.useState({
    emp_id:"",
    email:"",
    name:"",
    department:"",
    designation:""

  })
  const [department,setDepartment] = React.useState("")

  const handleClose = () => {
    setAddModal(false);
  };

  const handleSubmit = () => {
    let formData = {
      ...user
    }
    let token = localStorage.getItem("token");
    if (token) {
      console.log("boom")
      axios
        .post(
          apiEndPoints.addUser,
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
          console.log(res.data)
          setIsUpdated(true)
        })
        .catch((err) => {
          console.log(err.response)
          if(err.response && err.response.data && err.response.data.msg) alert(err.response.data.msg)
          else alert("Couldn't update! try later")
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
                <p className={classes.label}>Employee Id : </p>
                <TextField className={classes.field} name="empId" value={user.emp_id} onChange={(e) => setUser({...user,emp_id:e.target.value})}/>
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Name : </p>
                <TextField className={classes.field}  name="name"  value={user.name} onChange={(e) => setUser({...user,name:e.target.value})}/>
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Department : </p>
                <Select
                   value={user.department} onChange={(e) => setUser({...user,department:e.target.value})}
                  // onChange={(e) => setDepartment(e.target.value)}
                  className={classes.field}
                  
                >
                  {departments.map((dept) => {
                     return <MenuItem key={dept.department} value={dept.department} >{dept.department_name}</MenuItem>
  
                  })}
                 
                </Select>
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Email : </p>
                <TextField  className={classes.field} name="email" value={user.email} onChange={(e) => setUser({...user,email:e.target.value})}/>
            </div>
            <div className={classes.container}>
                <p className={classes.label}>Designation : </p>
                <Select
                   value={user.designation} onChange={(e) => setUser({...user,designation:e.target.value})}
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
       <p>User Details Added</p>
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
