import React from "react";
import { Divider, Paper } from "@mui/material";
export default function Budget() {
  return (
    <div>
      <Paper sx={{ textAlign: "center", padding: "1rem" }}>
        <h2>Budget Status</h2>
        <Divider />
        <h3 style={{ textAlign: "center" }}>
          Department Name : Computer Science and Engineering{" "}
        </h3>
        <h3 style={{ textAlign: "center" }}>
          Allocated Budget : &#8377; 1,00,000
        </h3>
        <h3 style={{ color: "green", textAlign: "center" }}>
          Available Budget : &#8377; 90,000
        </h3>
        <h3 style={{ color: "red", textAlign: "center" }}>
          Used Budget : &#8377; 10,000
        </h3>
      </Paper>
    </div>
  );
}
