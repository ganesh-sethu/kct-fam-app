import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import apiEndPoints from '../../../common/apiEndPoints';
import { useNavigate } from "react-router-dom";


export default function AcademicYear() {
  const [from,setFrom] = React.useState(null)
  const [to,setTo] = React.useState(null)
  const [token,setToken] = React.useState(localStorage.getItem("token"))
  const [isNull,setIsNull] = React.useState(true)
  const [alert,setAlert] = React.useState(undefined)
  let navigate = useNavigate();
  const getAcademicYear = (token) => {
    axios
      .get(apiEndPoints.getAcademicYear, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
       setIsNull(false)
       let currAcademicYear = res.data.year
       let fromTo = currAcademicYear.split("-")
        if(fromTo.length == 2){
          setFrom(fromTo[0])
          setTo(fromTo[1])
        }
      })
      .catch((err) => {
        if(err && err.response && err.response.data && err.response.data.msg){
          setIsNull(true)
          alert(err.response.data.msg)
        }
      });
  }

  React.useEffect(() => {
    if(token){
      getAcademicYear(token);
    }
    else{
      navigate("/login")
    }
  },[])

  const updateAcademicYear = () => {
      setAlert(undefined)
      axios.put(apiEndPoints.editAcademicYear,{
        academicYear : new Date(from).getFullYear() +"-"+new Date(to).getFullYear()
      },{
        headers: {
          Authorization: token,
        },
      }).then(res => {
        setAlert(
          <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="success">
            {res.data.msg}
          </Alert>
        );
        console.log(res.data)
      }).catch(err => {
        setAlert(
          <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="error">
            Error occured! try later
          </Alert>
        );
      })

  }


  const insertAcademicYear = () => {
    setAlert(undefined)
    axios.post(apiEndPoints.createAcademicYear,{
      academicYear : new Date(from).getFullYear() +"-"+new Date(to).getFullYear()
    },{
      headers: {
        Authorization: token,
      },
    }).then(res => {
      setAlert(
        <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="success">
          {res.data.msg}
        </Alert>
      );
    }).catch(err => {
      setAlert(
        <Alert sx={{ marginTop: "1rem" }} variant="filled" severity="error">
          Error occured! try later
        </Alert>
      );
    })

  }

  const handleSave = () => {
    if(isNull){
      insertAcademicYear();
    }
    else{
      updateAcademicYear();
    }
     
  }
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{display:"flex",width:"100%",gap:"2rem"}}>
                <p>Current Academic Year :</p>
                <DesktopDatePicker  
                  views={['year']} 
                  value={from}
                  onChange={setFrom}
                  renderInput={(params) => <TextField {...params} helperText={null}/>}
                  
                />
                <p>-</p>
                <DesktopDatePicker  
                  views={['year']} 
                  value={to}
                  onChange={setTo}
                  renderInput={(params) => <TextField {...params} helperText={null}/>}
                />
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button> 
              </div>
              {alert}
          </LocalizationProvider>
}
