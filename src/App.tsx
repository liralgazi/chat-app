import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
