import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import { Button } from '@mui/material';
import EditModal from "./EditModal"
import AddModal from "./AddModal"
import axios from 'axios';
import apiEndPoints from '../../../common/apiEndPoints';
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




export default function BasicTable({departments}) {
  const [editModal, setEditModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [users,setUsers] = React.useState([])
  const [user,setUser] = React.useState({})
  let navigate = useNavigate();


  React.useState(() => {
    let token = localStorage.getItem("token");
    if(token){
        axios.get(apiEndPoints.getAllUsers, {
            headers: {
              Authorization: token,
            },
          }).then(res => {
            if(res.data && res.data.users){
                setUsers(res.data.users)
            }
            else
            {
                console.log(users)
            }
  
        }).catch(err => {
            console.log(err)
        })
    }
    else{
        navigate("/login");
    }   
  },[])

  const handleEditUser = (u) => {
    setEditModal(true)
    setUser(u)

  }

  const handleNewDept = () => {
    setAddModal(true)

  }
  const labels = ["S.No","Employee Id","Name","Department","Email Id","Designation"]
  return (
    <div>
      <div style={{width:"100%",display:"flex",flexDirection:"row-reverse",marginBottom:"1rem"}}>
        <Button style={{width:"120px"}} variant="contained" color="primary" onClick={handleNewDept}>New</Button>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels.map((item,i) => {
              return <StyledTableCell align="center" key={i}>{item}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row,i) => (
            <TableRow
              hover
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleEditUser(row)}
              style={{cursor:"pointer"}}
    
            >
              <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell align="center">{row.emp_id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.department}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.designation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal editModal={editModal} setEditModal={setEditModal} user={user} departments={departments}/>
      <AddModal addModal={addModal} setAddModal={setAddModal} departments={departments}/>
    </TableContainer>
    
    </div>
    
  );
}


