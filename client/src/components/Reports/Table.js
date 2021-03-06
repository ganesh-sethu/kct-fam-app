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
import common from "../../common/functions";

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
          {/* <Button variant="contained" color="success" onClick={common.downloadTableAsCSV("reportTable")}> */}
          <Button variant="contained" color="success" onClick={() => common.downloadTableAsCSV("reportTable")}>
            Download
          </Button>
        </div>
      </div>
    );
  } else {
    return <h3>No results found</h3>;
  }
}
