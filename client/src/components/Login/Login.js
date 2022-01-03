import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import KctImage from "../../img/kct.jpg";
import axios from "axios";
import apiEndPoints from "../../common/apiEndPoints";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.kct.ac.in/">
        KCT faam
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const [load, setLoad] = React.useState(false);
  const [alert, setAlert] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true);

    const data = new FormData(event.currentTarget);
    axios
      .post(apiEndPoints.loginUser, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        setLoad(false);

        localStorage.setItem("token", "Bearer " + res.data.accessToken);

        navigate("/");
      })
      .catch((err) => {
        setLoad(false);
        if (err.response && err.response.status === 401) {
          setAlert("Invalid email or password");
        } else {
          setAlert("Couldn't login try later");
        }
      });
  };

  const sx = {
    backgroundImage: "url(" + KctImage + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor: (t) =>
      t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={sx} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {load ? <CircularProgress color="success" /> : " Log in"}
            </Button>

            {alert ? (
              <Alert variant="filled" severity="error">
                {alert}
              </Alert>
            ) : undefined}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
