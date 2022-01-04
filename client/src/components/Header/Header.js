import * as React from "react";
import axios from "axios";
import apiEndPoints from "../../common/apiEndPoints";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dashboard from "../Dashboard/Dashboard";
import { createStyles, makeStyles } from "@mui/styles";
import PageNotFound from "../404/404";
import Events from "../Events/Events";
import Reports from "../Reports/Reports";
import Requests from "../Requests/Requests";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/authenticationSlice";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Badge, Typography } from "@mui/material";
import NewEvent from "../NewEvent/NewEvent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      marginTop: "4rem",
    },
  })
);

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const classes = useStyles();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState("dashboard");
  const [requests, setRequests] = React.useState([]);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const getRequests = (token) => {
    axios
      .get(apiEndPoints.getRequests, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setRequests(res.data.requests);
        console.log(res.data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRequests = (id) => {
    setRequests(requests.filter((item) => item.request_id !== id));
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(apiEndPoints.getUser, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          dispatch(login(res.data));
          getRequests(token);
        })
        .catch((err) => {
          if (
            err.response &&
            (err.response.code === 401 || err.response.code === 403)
          )
            navigate("/logout");
          else navigate("/404");
        });
    } else {
      navigate("/login");
    }

    if (pathname.indexOf("/", 1) >= 0)
      setActive(pathname.substring(1, pathname.indexOf("/", 1)));
    else setActive(pathname.substring(1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        // sx={{ backgroundColor: "transparent" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: "#fff", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {active.charAt(0).toUpperCase() + active.substring(1)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          },
        }}
      >
        <DrawerHeader>
          <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            sx={{
              "&:hover": {
                background: theme.palette.primary.light,
              },
              background:
                active === "dashboard"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
            button
            onClick={() => {
              setActive("dashboard");

              navigate("/dashboard");
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            sx={{
              "&:hover": {
                background: theme.palette.primary.light,
              },
              background:
                active === "events"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
            button
            onClick={() => {
              setActive("events");
              navigate("/events");
            }}
          >
            <ListItemText primary="Events" />
          </ListItem>

          <ListItem
            sx={{
              "&:hover": {
                background: theme.palette.primary.light,
              },
              background:
                active === "requests"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
            button
            onClick={() => {
              setActive("requests");
              navigate("/requests");
            }}
          >
            <ListItemText primary="Requests" />

            {requests && requests.length ? (
              <Badge badgeContent={requests.length} color="error">
                <NotificationsActiveIcon />
              </Badge>
            ) : undefined}
          </ListItem>

          <ListItem
            sx={{
              "&:hover": {
                background: theme.palette.primary.light,
              },
              background:
                active === "reports"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
            }}
            button
            onClick={() => {
              setActive("reports");
              navigate("/reports");
            }}
          >
            <ListItemText primary="Reports" />
          </ListItem>
        </List>

        <List>
          <ListItem
            sx={{
              "&:hover": {
                background: theme.palette.primary.light,
              },
            }}
            button
            onClick={() => navigate("/logout")}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} className={classes.toolbar}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events value="upcoming" />} />
          <Route
            path="/events/upcoming"
            element={<Events value="upcoming" />}
          />
          <Route
            path="/events/previous"
            element={<Events value="previous" />}
          />
          <Route path="/events/new" element={<NewEvent />} />
          <Route
            path="/requests"
            element={
              <Requests requests={requests} updateRequests={updateRequests} />
            }
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Main>
    </Box>
  );
}
