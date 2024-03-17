import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLockOutline } from "@mdi/js";
import { Navigate, useHref } from "react-router-dom";

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
      "Fantasy",
    ].join(","),
    h6: {
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // More rounded corners
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px", // More rounded corners
          },
        },
      },
    },
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
      navigate("/chat", { state: { name } });
    } else {
      setError(validationResult.error);
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
    setSuccessSnackbarOpen(false);
  };
  /*
  useEffect(() => {
    if (localStorage.getItem("name") !== null) navigate("/chat");
  }, []);
*/
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fcfcfc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ddeaed",
            p: 4,
            borderRadius: "20px",
            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              fontFamily: "Fantasy",
              letterSpacing: 2,
              fontSize: 35,
            }}
          >
            <Icon
              path={mdiLockOutline}
              size={1.5}
              color="#d5dfe3"
              style={{
                marginBottom: "16px",
              }}
            />
            Please Enter Your Name
          </Typography>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={clickHandler}
          >
            Let's Go
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
