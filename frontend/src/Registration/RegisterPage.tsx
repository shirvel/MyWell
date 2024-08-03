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
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { register } from "./RegisterService";
import { FormData, Errors } from "./types";
import { CustomStepConnector } from "../components/CustomStepConnector";
import { CustomStepIcon } from "../components/CustomStepIcon";
import { CustomButton } from "../components/CustomButton";
import { addInfoToLocalStorage } from "../login/LoginPage";

const steps = [
	"Getting To Know you", 
	"What is your main goal?", 
	"Diets", 
	"Extra", 
	"Register"];

const RegisterStepper = ({ activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
    {steps.map((_, index) => (
      <Step key={index}>
        <StepLabel StepIconComponent={CustomStepIcon} />
      </Step>
    ))}
  </Stepper>
);

export const RegisterPage = () => {
	const { setUserId } = useUserContext();
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
		})
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
					setUserId(response.data._id);
					addInfoToLocalStorage(response.data);
					handleReset();
					navigate("/");
				}
				else {
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
    <div className="flex items-center justify-center" style={{ marginTop: "20px" }}>
      <Box className="w-1/3 p-4">
        <RegisterStepper activeStep={activeStep} />
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <CustomButton onClick={handleReset} color="secondary">Reset</CustomButton>
            </Box>
          </>
        ) : (
          <>
            {components[activeStep]}
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
              <CustomButton
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </CustomButton>
              <CustomButton
                color='primary'
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </CustomButton>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};
