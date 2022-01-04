import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
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
    textField: {
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
  initialValue,
  name,
  label,
}) {
  const [value, setValue] = React.useState(initialValue);
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
    setFormData({ ...formData, [name]: event.target.value });
  };

  return (
    <FormControl
      className={classes.container}
      sx={{ flexDirection: "row", gap: "1rem" }}
    >
      <p className={classes.label}>{name} </p>
      <p className={classes.colon}>:</p>
      <TextField
        value={value}
        onChange={handleChange}
        className={classes.textField}
        variant="standard"
        sx={{ marginTop: "1rem" }}
      />
    </FormControl>
  );
}
