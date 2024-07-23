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
import { FormData, Errors } from "./types";
import { uploadImage } from "./image_requests";

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
	const [formData, setFormData] = useState<FormData>({
		name: "",
		birthday: "",
		gender: "",
		mainGoal: "",
		specialDiets: "",
		healthConditions: "",
		comment: "",
		email: "",
		password: "",
		image: undefined,
	});
	const [errors, setErrors] = useState<Errors>({
		name: "",
		birthday: "",
		gender: "",
		mainGoal: "",
		specialDiets: "",
		email: "",
		password: "",
	});

	const handleNext = () => {
		if (validateCurrentStep()) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
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
			image: undefined,
		});
		setErrors({
			name: "",
			birthday: "",
			gender: "",
			mainGoal: "",
			specialDiets: "",
			email: "",
			password: "",
		});
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		setErrors((prev) => ({
			...prev,
			[field]: "",
		}));
	};

	const handleSubmit = async () => {
		if (validateCurrentStep()) {
			try {
				const image_url = await uploadImage(formData.image);
				const url = endpoints.AUTH.CREATE_USER();
				const response = await post(url, { ...formData, image: image_url });
				if (response.status == 201) {
					setUserId(response.data._id);
					handleReset();
					navigate("/");
				}
			} catch (error) {
				console.error("There was an error submitting the form!", error);
			}
		}
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const validateCurrentStep = () => {
		let newErrors = { ...errors };

		if (activeStep === 0) {
			if (!formData.name) newErrors.name = "Name is required";
			if (!formData.birthday) newErrors.birthday = "Birthday is required";
			if (!formData.gender) newErrors.gender = "Gender is required";
		} else if (activeStep === 1) {
			if (!formData.mainGoal)
				newErrors.mainGoal = "At least one goal is required";
		} else if (activeStep === 2) {
			if (!formData.specialDiets)
				newErrors.specialDiets = "Diet selection is required";
		} else if (activeStep === 4) {
			if (!formData.email) newErrors.email = "Email is required";
			else if (!validateEmail(formData.email))
				newErrors.email = "Invalid email format";
			if (!formData.password) newErrors.password = "Password is required";
		}

		setErrors(newErrors);

		return !Object.values(newErrors).some((error) => error);
	};

	const components = [
		<FirstStage
			formData={formData}
			handleChange={handleChange}
			errors={errors}
		/>,
		<SecondStage
			formData={formData}
			handleChange={handleChange}
			errors={errors}
		/>,
		<ThirdStage
			formData={formData}
			handleChange={handleChange}
			errors={errors}
		/>,
		<FourthStage formData={formData} handleChange={handleChange} />,
		<FifthStage
			formData={formData}
			handleChange={handleChange}
			errors={errors}
		/>,
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
