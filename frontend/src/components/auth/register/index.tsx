import { Button, TextField, Typography } from "@mui/material";
import type { RegisterPageProps } from "../../../common/types/auth";
import * as React from "react";
import { type JSX } from "react";

const RegisterPage: React.FC<RegisterPageProps> = (
  props: RegisterPageProps,
): JSX.Element => {
  const {
    setFirstName,
    setUsername,
    setEmail,
    setPassword,
    setRepeatPassword,
  } = props;
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Реєстрація
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Poppins"
        textAlign="center"
        marginBottom={3}
      >
        Введіть ваші дані для реєстрації
      </Typography>

      <TextField
        fullWidth={true}
        margin="normal"
        label="Ім'я"
        variant="outlined"
        placeholder="Введіть ваше ім'я"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Username"
        variant="outlined"
        placeholder="Введіть ваший username"
        onChange={(event) => setUsername(event.target.value)}
      />
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
      <TextField
        fullWidth={true}
        type="password"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Підтвердіть ваш пароль"
        onChange={(event) => setRepeatPassword(event.target.value)}
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
        Реєстрація
      </Button>

      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        У вас є акаунт?<span className="inciting-text">Увійти</span>
      </Typography>
    </>
  );
};

export default RegisterPage;
