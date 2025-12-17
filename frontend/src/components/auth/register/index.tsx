import { Button, TextField, Typography } from "@mui/material";

const RegisterPage = () => {
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
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Username"
        variant="outlined"
        placeholder="Введіть ваший username"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введіть ваш email"
      />
      <TextField
        fullWidth={true}
        type="password"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введіть ваш пароль"
      />
      <TextField
        fullWidth={true}
        type="password"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Підтвердіть ваш пароль"
      />
      <Button
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
