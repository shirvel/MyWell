import React, { useState, useCallback } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { login } from "./LoginService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";

export const addInfoToLocalStorage = (userInfo: { accessToken: string; refreshToken: string; userId: string; }) => {
  localStorage.setItem("accessToken", userInfo.accessToken);
  localStorage.setItem("refreshToken", userInfo.refreshToken);
  localStorage.setItem("userId", userInfo.userId);
};

export const LoginPage = () => {
  const { setUserId } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const onLogin = useCallback(async () => {
    console.log(email, password);
    const tokens = await login({ email, password });
    setUserId(tokens.userId);
    addInfoToLocalStorage(tokens);
    navigate("/");
  }, [email, password]);

  const onRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center" style={{ marginTop: '20px' }}>
      <div className="w-1/3 p-4">
        <Typography 
          variant="h5" 
          gutterBottom 
          style={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Product Sans', fontSize: '30px' }}
        >
          Login
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
              InputProps={{
                style: {
                  fontFamily: 'Product Sans',
                  fontWeight: '500',
                  borderRadius: '25px',
                  padding: '7px',
                }
              }}
              InputLabelProps={{
                style: {
                  fontFamily: 'Product Sans',
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                  '& fieldset': {
                    borderWidth: '2px',
                  }
                },
              }}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
              InputProps={{
                style: {
                  fontFamily: 'Product Sans',
                  fontWeight: '500',
                  borderRadius: '25px',
                  padding: '7px',
                }
              }}
              InputLabelProps={{
                style: {
                  fontFamily: 'Product Sans',
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                  '& fieldset': {
                    borderWidth: '2px',
                  }
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onLogin}
              variant="contained"
              fullWidth
              size="large"
              style={{
                fontWeight: 'bold',
                borderRadius: '20px',
                padding: '12px 24px',
                fontSize: '20px',
                textTransform: 'none',
                fontFamily: 'Product Sans'
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onRegister}
              variant="contained"
              fullWidth
              size="large"
              style={{
                fontWeight: 'bold',
                borderRadius: '20px',
                padding: '12px 24px',
                fontSize: '20px',
                textTransform: 'none',
                fontFamily: 'Product Sans'
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
