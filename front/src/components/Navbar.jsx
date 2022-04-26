import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../Redux/action";

// const settings = ["Profile", "Account", "Dashboard", "SignUp"];

const ResponsiveAppBar = () => {
  const token = useSelector((store) => store.login.token);
  const dispatch = useDispatch();

  const localStorageToken = localStorage.getItem("token");
  dispatch(userLogin(localStorageToken));

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    dispatch(userLogin({}));
    localStorage.setItem("token", "");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            APARTMENT MANAGER
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              ml: 5,
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              ml: 4,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/flatregister")}
          >
            Flat Register
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          ></Box>

          <Box sx={{ flexGrow: 0 }}>
            <MenuItem>
              <Typography
                textAlign="center"
                onClick={!token ? handleSignup : handleLogout}
              >
                {!token ? "SignUp" : "Logout"}
              </Typography>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
