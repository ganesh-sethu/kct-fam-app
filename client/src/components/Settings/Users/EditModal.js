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
                value={0}
                onChange={(e) => setDepartment(e.target.value)}
                className={classes.field}
                
              >
                <MenuItem value={0}>Staff</MenuItem>
                <MenuItem value={1}>Budget Co-ordinator</MenuItem>
                <MenuItem value={2}>HOD</MenuItem>
                <MenuItem value={3}>HR</MenuItem>
                <MenuItem value={4}>Archival </MenuItem>
                <MenuItem value={5}>Principal</MenuItem>
                
               
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
