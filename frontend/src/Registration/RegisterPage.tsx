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
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { FormData, Errors } from "./types";
import { checkEmailExists, register } from "./RegisterService";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const steps = [
    "Getting To Know you",
    "What is your main goal?",
    "Diets",
    "Extra",
    "Register",
];
  
const CustomStepIcon = (props: any) => {
    const { active, completed } = props;

    return (
        <div
            style={{
                width: 35, // Bigger circle
                height: 35, // Bigger circle
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: active ? '#1976d2' : completed ? '#1976d2' : '#ccc',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
            }}
        >
            {props.icon}
        </div>
    );
};

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px', // Adjust if needed
    },
    line: {
        height: 3,
        border: 'none',
        backgroundColor: '#ccc',
        borderRadius: 1,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)', // Center the line vertically
    },
    active: {
        backgroundColor: '#1976d2',
    },
    completed: {
        backgroundColor: '#4caf50',
    },
}));

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
		console.log("hello")
        if (validateCurrentStep()) {
			console.log("helloo")
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
            const exists = await checkEmailExists(formData.email);
            if (exists) {
                let newErrors = { ...errors };
                newErrors.email = "Email already exists";
                setErrors(newErrors);
            } else {
                register(formData).then((response) => {
                    if (response != null) {
                        setUserId(response._id);
                        handleReset();
                        navigate("/");
                    }
                });
            }
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateCurrentStep = () => {
        let newErrors = { ...errors };

		console.log(activeStep)
        if (activeStep === 0) {
            if (!formData.name) newErrors.name = "Name is required"; console.log("1");
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
        <div className="flex items-center justify-center" style={{ marginTop: '20px' }}>
            <Box className="w-1/3 p-4">
                <Stepper 
                    activeStep={activeStep} 
                    alternativeLabel 
                    connector={<CustomStepConnector />}
                >
                    {steps.map((_, index) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={CustomStepIcon} />
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
                        <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
                            <Button
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                style={{
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '12px 24px',
                                    fontSize: '20px',
                                    flex: '1',
                                    marginRight: '8px',
                                    textTransform: 'none',
                                    fontFamily: 'Product Sans'
                                }}
                                variant="contained"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '12px 24px',
                                    fontSize: '20px',
                                    flex: '1',
                                    marginRight: '8px',
                                    textTransform: 'none',
                                    fontFamily: 'Product Sans'
                                }}
                                onClick={
                                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                                }
                            >
                                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
};
