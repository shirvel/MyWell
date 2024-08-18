import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { FirstStage } from "./Stages/FirstStage";
import { SecondStage } from "./Stages/SecondStage";
import { ThirdStage } from "./Stages/ThirdStage";
import { FourthStage } from "./Stages/FourthStage";
import { FifthStage } from "./Stages/FifthStage";
import { useNavigate } from "react-router-dom";
import { register } from "./RegisterService";
import { FormData, Errors } from "./types";
import { CustomStepConnector } from "../components/CustomStepConnector";
import { CustomStepIcon } from "../components/CustomStepIcon";
import { CustomButton } from "../components/CustomButton";

const steps = [
	"Getting To Know you",
	"What is your main goal?",
	"Diets",
	"Extra",
	"Register",
];

const RegisterStepper = ({
    activeStep,
}: {
    activeStep: number | undefined;
}) => {
    const textColor = '#5A8BAF'; // The same color as the "Login" text

    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomStepConnector />}
        >
            {steps.map((_, index) => (
                <Step key={index}>
                    <StepLabel
                        StepIconComponent={CustomStepIcon}
                        StepIconProps={{
                            style: {
                                color: index === activeStep ? textColor : '#5A8BAF', // Apply color to the current step
                            }
                        }}
                        sx={{
                            '& .MuiStepLabel-label': {
                                color: index === activeStep ? textColor : '#5A8BAF', // Apply the color to the label text of the current step
                            }
                        }}
                    />
                </Step>
            ))}
        </Stepper>
    );
};

export const RegisterPage = () => {
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
		setErrors({
			name: "",
			birthday: "",
			gender: "",
			mainGoal: "",
			specialDiets: "",
			email: "",
			password: "",
		});
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
			register(formData).then((response) => {
				if (response?.status == 201) {
					handleReset();
					navigate("/login");
				} else {
					let newErrors = { ...errors };
					newErrors.email = response?.data;
					setErrors(newErrors);
				}
			});
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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: "url('/background.jpg')", // Use the same background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
            }}
        >
            <div style={{
                width: '700px', // Circle size
                height: '700px', // Circle size
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with slight opacity
                borderRadius: '50%', // Make it circular
                padding: '50px 30px 30px', // Padding inside the circle
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // Align items at the top
                alignItems: 'center',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
                textAlign: 'center', // Centralize content inside the circle
                position: 'relative', // Allow positioning of children
            }}>
                <RegisterStepper activeStep={activeStep} />
                {activeStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <CustomButton onClick={handleReset} color="secondary">
                                Reset
                            </CustomButton>
                        </Box>
                    </>
                ) : (
                    <>
                        {components[activeStep]}
                        <Box
    sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
    <CustomButton
        color="secondary"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{
            backgroundColor: '#5A8BAF', // Change to soft blue color
            color: 'white',            // Text color should be white
        }}
    >
        Back
    </CustomButton>
    <CustomButton
        color="primary"
        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
        sx={{
            backgroundColor: '#5A8BAF', // Change to soft blue color
            color: 'white',            // Text color should be white
        }}
    >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
    </CustomButton>
</Box>
                    </>
                )}
            </div>
        </div>
    );
};
