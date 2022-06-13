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



export default function AlertDialog({addModal,setAddModal,departments}) {
  const classes = useStyles()
  const [department,setDepartment] = React.useState("")

  const handleClose = () => {
    setAddModal(false);
  };

  return (
    <div>
      <Dialog
        open={addModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        <DialogContent>
        <div className={classes.container}>
              <p className={classes.label}>Employee Id : </p>
              <TextField className={classes.field} name="empId" />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Name : </p>
              <TextField className={classes.field}  name="name" />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Department : </p>
              <Select
                onChange={(e) => setDepartment(e.target.value)}
                className={classes.field}
                
              >
                <MenuItem value="">None</MenuItem>
                {departments.map((dept) => {
                   return <MenuItem key={dept.department} >{dept.department_name}</MenuItem>

                })}
               
              </Select>
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Email : </p>
              <TextField  className={classes.field} name="usedBudget"  />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Designation : </p>
              <Select
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
