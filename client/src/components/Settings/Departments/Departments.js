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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



export default function BasicTable({departments,setValue}) {
  const [editModal, setEditModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [department,setDepartment] = React.useState([])

  const handleEditDepartment = (dept) => {
    setEditModal(true)
    setDepartment(dept)

  }

  const handleNewDept = () => {
    setAddModal(true)

  }
  const labels = ["S.No","Department","Allocated Budget","Used Budget"]
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
          {departments.map((row,i) => (
            <TableRow
              hover
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleEditDepartment(row)}
              style={{cursor:"pointer"}}
    
            >
              <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell align="center">{row.department_name}</TableCell>
              <TableCell align="center">{row.allocated_budget}</TableCell>
              <TableCell align="center">{row.budget_used}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal editModal={editModal} setEditModal={setEditModal} department={department} setValue={setValue} />
      <AddModal addModal={addModal} setAddModal={setAddModal} setValue={setValue}  />
    </TableContainer>
    
    </div>
    
  );
}


