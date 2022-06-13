import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles } from "@mui/styles";
import { TextField } from '@mui/material';


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



export default function AlertDialog({editModal,setEditModal,department}) {
  const classes = useStyles()
  console.log(department)
  const handleClose = () => {
    setEditModal(false);
  };

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
              <p className={classes.label}>Department Name : </p>
              <TextField name="name" value={department.department_name} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Allocated Budget : </p>
              <TextField type="number" name="allocatedBudget" value={department.allocated_budget} />
          </div>
          <div className={classes.container}>
              <p className={classes.label}>Used Budget : </p>
              <TextField type="number" name="usedBudget" value={department.budget_used} />
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
