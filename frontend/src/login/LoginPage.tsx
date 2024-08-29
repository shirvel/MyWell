import { useState, useCallback } from "react";
import { Alert, Grid } from "@mui/material";
import { login } from "./LoginService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";
import { CustomTextField } from "../components/CustomTextField";
import { CustomButton } from "../components/CustomButton"; // Import your CustomButton
import { CustomTypography } from "../components/CustomTypography";
import React from "react";
import { Link } from "react-router-dom";

// Ensure that the Lora font is loaded in your project, you can include this in your index.html or import via CSS
// @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');

export const linkStyle: React.CSSProperties = {
    color: '#5A8BAF',
    textDecoration: 'underline',
    fontSize: '16px',
    cursor: 'pointer',
};

export const addInfoToLocalStorage = (userInfo: {
    accessToken: string;
    refreshToken: string;
    userId: string;
}) => {
    localStorage.setItem("accessToken", userInfo.accessToken);
    localStorage.setItem("refreshToken", userInfo.refreshToken);
    localStorage.setItem("userId", userInfo.userId);
};

export const removeInfoToLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
};

export const LoginPage = () => {
    const { setUserId } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const onLogin = useCallback(async () => {
        const tokens = await login({ email, password });
        if (tokens) {
            setUserId(tokens.userId);
            addInfoToLocalStorage(tokens);
            navigate("/meal-planner");
        } else {
            setShowError(true);
        }
    }, [email, password]);

	const buttonStyle: React.CSSProperties = {
        backgroundColor: '#5A8BAF',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '50px', // Make the button have rounded corners like in the picture
        textTransform: 'none',
        fontSize: '20px',
        fontFamily: 'Product Sans',
        width: '50%', // Make the button wider
        maxWidth: '400px', // You can adjust the max-width as needed
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: "url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
            }}
        >
            <div style={{
                width: '700px',
                height: '700px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                padding: '50px 30px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                position: 'relative',
            }}>
                <CustomTypography style={{
                    position: 'absolute',
                    top: '60px',
                    fontFamily: "'Lora', serif",
                    color: '#5A8BAF',
                    fontSize: '40px',
                }}>
                    Login
                </CustomTypography>
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '150px' }}>
                    <Grid item xs={12} style={{ marginBottom: '20px', width: '100%', maxWidth: '360px' }}>
                        <CustomTextField
                            label="Email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setShowError(false);
                            }}
                            value={email}
                            required={true}
                            InputProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    border: '1px solid #ddd',
                                    padding: '20px 14px 8px 14px',
                                    borderRadius: '20px',
                                    width: '100%',
                                    maxWidth: '360px',
                                }
                            }}
                            InputLabelProps={{
                                style: { 
                                    color: '#5A8BAF', 
                                    fontSize: '16px',
                                    transform: 'translate(0, -30px) scale(1)',
                                    backgroundColor: 'white',
                                    padding: '0 4px',
                                    zIndex: 1,
                                }
                            }}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px', width: '100%', maxWidth: '360px' }}>
                        <CustomTextField
                            label="Password"
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setShowError(false);
                            }}
                            value={password}
                            required={true}
                            InputProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    border: '1px solid #ddd',
                                    padding: '10px 14px',
                                    borderRadius: '20px',
                                    width: '100%',
                                    maxWidth: '360px',
                                }
                            }}
                            InputLabelProps={{
                                style: { color: '#5A8BAF', fontSize: '16px' }
                            }}
                            fullWidth={true}
                        />
                    </Grid>

                    {showError && (
                        <Grid item xs={12} style={{ width: '300px' }}>
                            <Alert severity="error">
                                The Email or Password are incorrect please try again or register
                            </Alert>
                        </Grid>
                    )}

                    <Grid item xs={12} style={{ marginBottom: '10px', width: '300px' }}>
                        <CustomButton
                            onClick={onLogin}
                            size="medium"
                            label="Login"
                            style={buttonStyle}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ width: '300px' }}>
                        <CustomTypography style={linkStyle}>
                            <Link to="/register" style={{ textDecoration: 'none', color: '#5A8BAF' }}>Don't have an account yet? Register</Link>
                        </CustomTypography>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};