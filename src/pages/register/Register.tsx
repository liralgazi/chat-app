import "./RegisterStyles.scss";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiLockOutline } from "@mdi/js";
import { useSnackbar } from "../../components/hooks/useSnackbar";
import { useForm } from "../../components/hooks/useForm";
import theme from "../../components/themes/theme";

export default function Register() {
  const navigate = useNavigate();
  const { name, setName, submitForm, error } = useForm(navigate);
  const {
    showSnackbar: showSuccessSnackbar,
    closeSnackbar: handleCloseSnackbar,
  } = useSnackbar();

  const clickHandler = () => {
    submitForm();
    if (!error) {
      showSuccessSnackbar();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="box">
        <Typography variant="h5" className="typo" />
        <Box className="register-box">
          <Typography
            variant="h5"
            className="typography"
            sx={{
              fontFamily: "fantasy",
              fontSize: 50,
            }}
          >
            <Icon path={mdiLockOutline} size={2} color="#2f6d7a" />
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2f6d7a",
              "&:hover": { backgroundColor: "#265e68" },
            }}
            onClick={clickHandler}
          >
            {" "}
            Let's Go
          </Button>
        </Box>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
      </Box>
    </ThemeProvider>
  );
}
