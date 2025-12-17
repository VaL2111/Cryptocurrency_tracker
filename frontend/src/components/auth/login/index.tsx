import { Button, TextField, Typography } from "@mui/material";

const LoginPage = () => {
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
      />
      <TextField
        fullWidth={true}
        type="password"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введіть ваш пароль"
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
        Увійти
      </Button>

      <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
        У вас немає акаунту?<span className="inciting-text">Реєстрація</span>
      </Typography>
    </>
  );
};

export default LoginPage;
