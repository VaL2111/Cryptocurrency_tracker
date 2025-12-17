import { useLocation } from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import "./style.css";
import { Box } from "@mui/material";
import { type JSX, useState } from "react";
import { instance } from "../../utils/axios";
import * as React from "react";

const AuthRootComponent: React.FC = (): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const location = useLocation();

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    if (location.pathname === "/login") {
      const userData = {
        email,
        password,
      };
      const user = await instance.post("auth/login", userData);
      console.log(user);
    } else {
      if (password === repeatPassword) {
        const userData = {
          firstName,
          username,
          email,
          password,
        };
        const newUser = await instance.post("auth/register", userData);
        console.log(newUser);
      } else {
        throw new Error("У вас не співпадають паролі!");
      }
    }
  };

  return (
    <div className="root">
      <form className="form" onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          {location.pathname === "/login" ? (
            <LoginPage setEmail={setEmail} setPassword={setPassword} />
          ) : location.pathname === "/register" ? (
            <RegisterPage
              setEmail={setEmail}
              setPassword={setPassword}
              setRepeatPassword={setRepeatPassword}
              setFirstName={setFirstName}
              setUsername={setUsername}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};

export default AuthRootComponent;
