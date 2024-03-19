import "./styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Register from "./pages/register/Register";
import { Box } from "@mui/material";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDarkMode) {
        document.body.classList.add("dark-mode");
        console.log("dark mode");
      } else {
        document.body.classList.remove("dark-mode");
        console.log("light mode");
      }
    };

    // Call it to set the initial theme
    updateTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      // Listen for changes
      .addEventListener("change", updateTheme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);
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
