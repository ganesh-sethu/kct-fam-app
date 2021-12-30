import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Header from "./components/Header/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<Header />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
