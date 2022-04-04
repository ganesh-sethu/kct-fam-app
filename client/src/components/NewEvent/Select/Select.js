import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    label: {
      width: "20%",
    },
    select: {
      width: "75%",
    },
    colon: {
      width: "5%",
    },
  })
);

export default function BasicSelect({
  formData,
  setFormData,
  menuItems,
  initialValue,
  name,
  label,
}) {
  const classes = useStyles();
  const handleChange = (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  return (
    <FormControl
      className={classes.container}
      sx={{ flexDirection: "row", gap: "1rem" }}
    >
      <p className={classes.label}>{name} </p>
      <p className={classes.colon}>:</p>
      <Select
        variant="standard"
        value={formData[name]}
        label={label}
        onChange={handleChange}
        className={classes.select}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
