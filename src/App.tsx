import "./styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Register from "./pages/register/Register";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
