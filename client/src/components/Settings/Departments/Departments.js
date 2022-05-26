import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({departments}) {
  const labels = ["S.No","Department","Allocated Budget","Used Budget"]
  console.log(departments)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels.map((item,i) => {
              return <TableCell align="center" key={i}>{item}</TableCell>
            })}

          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    </TableContainer>
  );
}
