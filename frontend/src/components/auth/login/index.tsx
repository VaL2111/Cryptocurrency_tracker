import { Button, TextField, Typography } from "@mui/material";
import type { LoginPageProps } from "../../../common/types/auth";
import * as React from "react";
import { type JSX } from "react";

const LoginPage: React.FC<LoginPageProps> = (
  props: LoginPageProps,
): JSX.Element => {
  const { setEmail, setPassword } = props;
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Авторизація
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Poppins"
        textAlign="center"
        marginBottom={3}
      >
        Введіть ваш логін та пароль
      </Typography>

      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введіть ваш email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        fullWidth={true}
        type="password"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введіть ваш пароль"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          fontFamily: "Poppins",
          marginTop: 2,
          marginBottom: 2,
          width: "60%",
        }}
      >
        Увійти
      </Button>

      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        У вас немає акаунту?<span className="inciting-text">Реєстрація</span>
      </Typography>
    </>
  );
};

export default LoginPage;
