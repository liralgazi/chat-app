import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const validateName = (name: string) => {
  let isValid = true;
  let error = "";

  if (name.length < 3) {
    error = "Your name is too short!";
    isValid = false;
  } else if (name.length > 10) {
    error = "Your name is too long!";
    isValid = false;
  } else {
    const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (regex.test(name)) {
      error = "Please enter a valid name!";
      isValid = false;
    }
  }

  return { isValid, error };
};

export default function Register() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const clickHandler = () => {
    const validationResult = validateName(name);
    if (validationResult.isValid) {
      setSuccessSnackbarOpen(true);
      localStorage.setItem("name", name);
      navigate("/chat");
    } else {
      setError(validationResult.error);
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
    //setSuccessSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e4eef7",
            p: 7,
            borderRadius: "10px",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 2, color: "#2196f3" }}
          >
            Please Enter Your Name
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={clickHandler}
          >
            Enter
          </Button>
        </Box>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Success! Your name has been validated."
        />
      </Box>
    </ThemeProvider>
  );
}
