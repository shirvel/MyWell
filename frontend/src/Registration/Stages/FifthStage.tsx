import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Errors, FormData } from "../types";

interface FifthStageProps {
    formData: FormData;
    handleChange: (field: string, value: any) => void;
    errors: Errors;
}

export const FifthStage = ({
    formData,
    handleChange,
    errors,
}: FifthStageProps) => {
    const [image, setImage] = useState<string | ArrayBuffer>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target && e.target.result ? e.target.result : "");
            };
            handleChange("image", file);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage("");
    };

    return (
        <div className="p-4">
            <Typography 
                variant="h5" 
                gutterBottom
                style={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Product Sans', fontSize: '30px' }}
            >
                Register
            </Typography>
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center">
                    <input
                        accept="image/*"
                        type="file"
                        id="image-upload"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <Avatar
                            alt="User Image"
                            src={image.toString()}
                            sx={{
                                width: 120, 
                                height: 120, 
                                cursor: "pointer",
                                borderRadius: '50%', // Make the avatar circular
                                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                            }}
                        />
                    </label>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    {image && (
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleRemoveImage}
                            sx={{
                                borderRadius: '25px', // Circular borders
                                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                                fontFamily: 'Product Sans',
                                fontWeight: '500', // Thicker text
                            }}
                        >
                            Remove Image
                        </Button>
                    )}
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Email"
                                variant="outlined"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    style: {
                                        fontFamily: 'Product Sans',
                                        fontWeight: '500', // Thicker text
                                        borderRadius: '25px', // More circular borders
                                        padding: '7px', // Increased padding
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Product Sans',
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '25px', // More circular borders
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                                        '& fieldset': {
                                            borderWidth: '2px', // Thicker border
                                        }
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    style: {
                                        fontFamily: 'Product Sans',
                                        fontWeight: '500', // Thicker text
                                        borderRadius: '25px', // More circular borders
                                        padding: 'px', // Increased padding
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: 'Product Sans',
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '25px', // More circular borders
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', // Shadow
                                        '& fieldset': {
                                            borderWidth: '2px', // Thicker border
                                        }
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};
