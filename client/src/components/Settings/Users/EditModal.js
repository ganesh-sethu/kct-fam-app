import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { MenuItem, Select, TextField } from '@mui/material';


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
  const classes = useStyles()
  const [department,setDepartment] = React.useState(user.department)
  const [designation,setDesignation] = React.useState(user.designation)
  const handleClose = () => {
    setEditModal(false);
  };

  React.useEffect(() => {
    console.log(department)
  })


  return (
    <div>
      <Dialog
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
              <TextField className={classes.field} name="empId" value={user.emp_id} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Name : </p>
              <TextField className={classes.field}  name="name" value={user.name} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Department : </p>
              <Select
                value={user.department?user.department:""}
                onChange={(e) => setDepartment(e.target.value)}
                className={classes.field}
                
              >
                <MenuItem value="">None</MenuItem>
                {departments.map((dept) => {
                   return <MenuItem key={dept.department} value={dept.department}>{dept.department_name}</MenuItem>

                })}
               
              </Select>
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Email : </p>
              <TextField  className={classes.field} name="usedBudget" value={user.email} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Designation : </p>
              <Select
                value={user.designation}
                onChange={(e) => {console.log(e.target.value);setDesignation(e.target.value)}}
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
          <Button variant="contained" color="success" onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
