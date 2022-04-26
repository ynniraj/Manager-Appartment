import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function FlatRegister() {

  const handleSubmitFlat = (event) => {
    event.preventDefault();
    const payload = {
      type: event.target.type.value,
      block: event.target.block.value,
      flatno: event.target.flatno.value,
      flatimg: event.target.flatimg.value,
      resident: JSON.parse(localStorage.getItem("residentId")),
    };
    console.log(payload);
    axios
      .post("https://manager-assignment.herokuapp.com/flatregister", payload)
      .then((res) => {
        console.log(res);
        alert("Flat created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitUser = (event) => {
    event.preventDefault();
    const payload = {
      name: event.target.name.value,
      gender: event.target.gender.value,
      age: event.target.age.value,
    };

    axios
      .post("https://manager-assignment.herokuapp.com/residents", payload)
      .then((res) => {
        console.log(res.data.response);
        localStorage.setItem(
          "residentId",
          JSON.stringify(res.data.response._id)
        );
        alert("User created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Resident Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register User
              </Button>
            </Box>
          </Box>
        </Container>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Flat Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitFlat}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="off"
                    name="type"
                    required
                    fullWidth
                    id="type"
                    label="Flat Type"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="block"
                    label="Flat Block"
                    name="block"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="flatno"
                    label="Flat No"
                    name="flatno"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="flatimg"
                    label="Flat Image"
                    name="flatimg"
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register Flat
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
