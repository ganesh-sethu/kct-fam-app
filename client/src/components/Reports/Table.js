import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import formFields from "../../common/formFields";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({ events }) {
  if (events && events.length) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            id="reportTable"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  {formFields.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formFields.from}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formFields.to}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formFields.eventType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formFields.facultyInCharge}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formFields.budget}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row) => (
                <StyledTableRow key={row.request_id}>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.title]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.from]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.to]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.eventType]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.facultyInCharge]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.event_info[formFields.budget]}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button variant="contained" color="success">
            Download
          </Button>
        </div>
      </div>
    );
  } else {
    return <h3>No results found</h3>;
  }
}
