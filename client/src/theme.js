import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222838",
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
