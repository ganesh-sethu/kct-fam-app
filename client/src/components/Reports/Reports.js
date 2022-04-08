import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Divider, MenuItem, Paper, Select,TextField } from "@mui/material";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper : {
      display:"flex",
      flexDirection:"row",
      width:"100%",
      justifyContent:"space-evenly",
      marginBottom:"1rem"
    },
    select : {
      width:"50%",
      
    },
    label:{
      fontWeight:"500",
      width:"40%"
    }
    
  })
);


export default function Reports({departments,users}) {
  const [reportType,setReportType]=React.useState("date")
  const [department,setDepartment] = React.useState("none")
  const [faculty,setFaculty] = React.useState("none")
  const [from,setFrom] = React.useState(new Date())
  const [to,setTo] = React.useState(new Date())
  const classes = useStyles();

  const handleSubmit = () => {
    const data = { reportType,department,faculty,from,to }
    console.log(data)
  
  }
  return  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div>
        <div className={classes.wrapper}>
          <p className={classes.label}>Choose Report Type  </p>
          <p>:  </p>
          <Select
            value={reportType}
            variant="standard"
            placeholder="Choose report type"
            label="Choose report type"
            onChange={(e) => setReportType(e.target.value)}
            className={classes.select}
            >
            <MenuItem value="date">
                Date wise
            </MenuItem>
            <MenuItem value="department">
                Department wise
            </MenuItem>
            <MenuItem value="faculty">
                Faculty wise
            </MenuItem>
          </Select>
        </div>
        <div className={classes.wrapper} style={{display: reportType==="department"?"flex":"none"}}>
          <p className={classes.label}>Choose Department  </p>
          <p>:  </p>
          <Select
            value={department}
            variant="standard"
            label="Choose department"
            onChange={(e) => setDepartment(e.target.value)}
            className={classes.select}
            >
              <MenuItem value="none">
                <i>None</i>
              </MenuItem>
              {departments.map((item,i) => {
                return <MenuItem value={item.department} key={i}>
                  {item.department_name}
                 </MenuItem>

              })}
          </Select>
        </div>
        <div className={classes.wrapper} style={{display: reportType==="faculty"?"flex":"none"}}>
          <p className={classes.label}>Choose Faculty </p>
          <p>:  </p>
          <Select
            value={faculty}
            variant="standard"
            label="Choose faculty"
            onChange={(e) => setFaculty(e.target.value)}
            className={classes.select}
            >
              <MenuItem value="none">
                <i>None</i>
              </MenuItem>
              {users.map((item,i) => {
                return <MenuItem value={item.emp_id} key={i}>
                  {item.name}
                </MenuItem>

              })}
          </Select>
        </div>
        <div className={classes.wrapper} style={{display: reportType==="date"?"flex":"none"}}>
          <p className={classes.label}>From </p>
          <p>:  </p>
          <div className={classes.select}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={from}
              onChange={(val) => setFrom(val)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
        <div className={classes.wrapper} style={{display: reportType==="date"?"flex":"none"}}>
          <p className={classes.label}>To </p>
          <p>:  </p>
          <div className={classes.select}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={to}
              onChange={(val) => setTo(val)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div> 
        <div className={classes.wrapper}>
            <Button sx={{width:"200px",margin:"2rem 0"}} variant="contained" onClick={handleSubmit}>Show Report</Button>  
        </div>
      
  </div>
  </LocalizationProvider> ;
}
