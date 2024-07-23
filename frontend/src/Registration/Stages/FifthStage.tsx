import { Avatar, Button, Grid, TextField } from "@mui/material";
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
			console.log("the image is", image);
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage("");
	};
	return (
		<div className="space-y-4 p-4 flex items-center justify-center content-center">
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item xs={12}>
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
								sx={{ width: 120, height: 120, cursor: "pointer" }}
							/>
						</label>
					</div>
				</Grid>
				<Grid item xs={12}>
					{image && (
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={handleRemoveImage}
							className="mb-4">
							Remove Image
						</Button>
					)}
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="w-full"
						label="Email"
						variant="outlined"
						value={formData.email}
						onChange={(e) => handleChange("email", e.target.value)}
						error={!!errors.email}
						helperText={errors.email}
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
					/>
				</Grid>
			</Grid>
		</div>
	);
};
