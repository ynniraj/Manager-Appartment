import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LoginFirst = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <img
          src="https://user-images.githubusercontent.com/987136/42195134-6ed15bb6-7e45-11e8-9735-2ad2870eaa07.png"
          alt=""
          style={{ width: "40%", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            mx: 3,
            px: 6,
          }}
          onClick={() => navigate("/register")}
        >
          SignUp
        </Button>
      </div>
    </>
  );
};

export default LoginFirst;
