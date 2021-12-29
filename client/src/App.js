import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;
