import { Button, TextField } from '@mui/material';
import * as React from 'react';

export default function AcademicYear() {
  const [academicYear,setAcademicYear] = React.useState("")
  return <div style={{display:"flex",width:"100%",gap:"2rem"}}>
            <p>Current Academic Year :</p>
            <TextField  value={academicYear} name="academicYear"/>
            <Button variant="contained" color="primary">Save</Button> 
    </div>
}
