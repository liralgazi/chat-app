import { useState } from "react";
import "./RegisterStyles.scss";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLockOutline } from "@mdi/js";
import { validateName } from "../../helpers/validateName";

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
            borderRadius: "20px",
          },
        },
      },
    },
  },
});

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
      <Box className="box">
        <Box className="innerBox">
          <Typography
            variant="h5"
            className="typography"
            sx={{
              fontFamily: "fantasy",
              fontSize: 30,
            }}
          >
            <Icon path={mdiLockOutline} size={1.5} color="#d5dfe3" />
            Please Enter Your Name
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={clickHandler}>
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
