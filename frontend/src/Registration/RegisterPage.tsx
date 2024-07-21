import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { FirstStage } from "./Stages/FirstStage";
import { SecondStage } from "./Stages/SecondStage";
import { ThirdStage } from "./Stages/ThirdStage";
import { FourthStage } from "./Stages/FourthStage";
import { FifthStage } from "./Stages/FifthStage";
import { endpoints } from "../api/endpoints";
import { post } from "../api/requests";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";

const steps = [
	"Getting To Know you",
	"What is your main goal?",
	"Diets",
	"Extra",
	"Register",
];

export const RegisterPage = () => {
	const { userId, setUserId } = useUserContext();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		name: "",
		birthday: "",
		gender: "",
		mainGoal: "",
		specialDiets: "",
		healthConditions: "",
		comment: "",
		email: "",
		password: "",
	});

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
		setFormData({
			name: "",
			birthday: "",
			gender: "",
			mainGoal: "",
			specialDiets: "",
			healthConditions: "",
			comment: "",
			email: "",
			password: "",
		});
	};

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const url = endpoints.AUTH.CREATE_USER();
			const response = await post(url, formData);
			if (response.status == 201) {
				setUserId(response.data._id);
				handleReset();
				navigate("/");
			}
		} catch (error) {
			console.error("There was an error submitting the form!", error);
		}
	};

	const components = [
		<FirstStage formData={formData} handleChange={handleChange} />,
		<SecondStage formData={formData} handleChange={handleChange} />,
		<ThirdStage formData={formData} handleChange={handleChange} />,
		<FourthStage formData={formData} handleChange={handleChange} />,
		<FifthStage formData={formData} handleChange={handleChange} />,
	];

	return (
		<div className="flex items-center justify-center">
			<Box className="w-1/2 p-4">
				<Stepper activeStep={activeStep}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						{components[activeStep]}
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button
								onClick={
									activeStep === steps.length - 1 ? handleSubmit : handleNext
								}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		</div>
	);
};
