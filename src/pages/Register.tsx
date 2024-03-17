import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useHref, useNavigate } from "react-router-dom";

const validateName = (name: string) => {
  //TODO move to validator.ts
  let isValid = true;
  if (name.length < 3) {
    alert("Your name is too short!"); //TODO snackbar
    isValid = false;
  }
  if (name.length > 10) {
    alert("Your name is too long!");
    isValid = false;
  }

  const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  if (regex.test(name)) {
    alert("Please enter a valid name!");
    isValid = false;
  }

  return isValid;
};
export default function Register() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("name") !== null) navigate("/chat");
  }, []);

  const clickHandler = () => {
    if (!validateName(name)) return; //TODO: validateName should return an error which
    //the component should render!
    localStorage.setItem("name", name);
  };

  return (
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
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Please Enter Your Name
        </Typography>
        <TextField
          label="Enter something"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={clickHandler}
        >
          Enter
        </Button>
      </Box>
    </Box>
  );
}
