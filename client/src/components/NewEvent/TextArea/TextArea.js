import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextAreaField from "@mui/material/TextareaAutosize";
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

export default function TextArea({
  formData,
  setFormData,
  initialValue,
  name,
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
      sx={{ flexDirection: "row", gap: "1rem", marginTop: "1rem" }}
    >
      <p className={classes.label}>{name} </p>
      <p className={classes.colon}>:</p>
      <TextAreaField
        value={value}
        onChange={handleChange}
        className={classes.textField}
        sx={{ marginTop: "1rem" }}
        minRows={6}
      />
    </FormControl>
  );
}
