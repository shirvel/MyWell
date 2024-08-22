import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Box,
    CircularProgress,
    IconButton,
    Collapse,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMealPlanner, MealTypes, getMealPlan } from "./MealPlannerService";
import { useUserContext } from "../providers/UserContextProvider";
import { dayColumns, PlannerDates, isDayPassed } from "../common/plannerUtils";
import { DateNav } from "../common/PlannerDateNav";
import MealWithImage from "./MealWithImage"; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MealPlanner = () => {
    const { userId } = useUserContext();
    const [mealPlan, setMealPlan] = useState<IMealPlanner | null>(null);
    const [dates, setDates] = useState<PlannerDates | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedMeal, setExpandedMeal] = useState<{ [key: string]: boolean }>({});
    const requestInProgress = useRef<boolean>(false);

    const loadMealPlan = useCallback(async (dates?: PlannerDates) => {
        if (dates) {
            setDates({ startDate: dates.startDate, endDate: dates.endDate });
        }
        if (userId != null) {
            if (requestInProgress.current) {
                return;
            }

            requestInProgress.current = true;

            try {
                const response = await getMealPlan(userId, dates);
                setMealPlan(response);

                const mealNames: string[] = [];

                Object.keys(response).forEach(day => {
                    MealTypes.forEach(mealType => {
                        if (response[day][mealType]) {
                            mealNames.push(response[day][mealType].name);
                        }
                    });
                });

                // Fetch images for the meals
                await fetchBatchMealImages(mealNames);

                setDates({ startDate: response.startDate, endDate: response.endDate });
            } catch (err) {
                console.log("Failed to load meal plan");
            } finally {
                setLoading(false);
                requestInProgress.current = false;
            }
        }
    }, [userId]);

    useEffect(() => {
        loadMealPlan();
    }, [loadMealPlan]);

    const handleLike = (day: string, mealType: string) => {
        console.log(`Liked ${mealType} on ${day}`);
        // Implement like functionality here
    };

    const handleEdit = (day: string, mealType: string) => {
        console.log(`Editing ${mealType} on ${day}`);
        // Implement edit functionality here
    };

    const handleExpandClick = (day: string, mealType: string) => {
        setExpandedMeal((prev) => ({
            ...prev,
            [`${day}-${mealType}`]: !prev[`${day}-${mealType}`],
        }));
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return mealPlan ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `url('/test.jpg')`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                padding: "20px",
                backgroundColor: "#f0f8ff", 
            }}
        >
            <Box
                className="background-overlay"
                sx={{
                    width: "100%",
                    maxWidth: "1600px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)", 
                    borderRadius: "15px", 
                    padding: "25px", 
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", 
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{
                        color: "#5e7b99", 
                        fontWeight: "bold",
                        fontFamily: "Lora", 
                    }}
                >
                    Weekly Planner
                </Typography>
                <DateNav
                    dates={{ startDate: mealPlan.startDate, endDate: mealPlan.endDate }}
                    loadPlan={loadMealPlan}
                />
                <Table
                    style={{
                        tableLayout: "fixed", 
                        width: "100%",
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {dayColumns.map((day) => (
                                <TableCell
                                    key={day}
                                    align="center"
                                    style={{
                                        color: "#6C757D",
                                        fontWeight: "bold",
                                        fontSize: "18px", 
                                        padding: "12px",
                                        borderBottom: "2px solid #4a90e2", 
                                        width: "150px", 
                                    }}
                                >
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {MealTypes.map((mealType) => (
                            <TableRow key={mealType}>
                                {dayColumns.map((day) => (
                                    <TableCell
                                        key={`${mealType}-${day}`}
                                        align="center"
                                        style={{
                                            padding: "10px", 
                                            backgroundColor: isDayPassed(day) ? "#DCDCDC" : "#f9fafb", 
                                            borderBottom: "1px solid #DCDCDC",
                                            borderRadius: "12px", 
                                            height: "auto",  // Adjust height automatically based on content
                                            width: "150px",   
                                            verticalAlign: "top", 
                                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", 
                                        }}
                                    >
                                        {mealPlan && mealPlan[day][mealType] && (
                                            <div>
                                                <MealWithImage
                                                    mealName={mealPlan[day][mealType].name}
                                                />
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                    <IconButton 
                                                        onClick={() => handleLike(day, mealType)} 
                                                        color="primary"
                                                    >
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                    <IconButton 
                                                        onClick={() => handleEdit(day, mealType)} 
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleExpandClick(day, mealType)}
                                                        color="primary"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </Box>
                                                <Collapse in={expandedMeal[`${day}-${mealType}`]} timeout="auto" unmountOnExit>
                                                    <Typography variant="body2" align="left" style={{ padding: "10px", textAlign: "left" }}>
                                                        <strong>Ingredients:</strong><br />
                                                        {mealPlan[day][mealType].ingredients.map((ingredient, index) => (
                                                            <div key={index}>{ingredient}</div>
                                                        ))}
                                                    </Typography>
                                                </Collapse>
                                            </div>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    ) : (
        <div>
            No meal plan available.
            <DateNav
                dates={{ startDate: dates?.startDate, endDate: dates?.endDate }}
                loadPlan={loadMealPlan}
            />
        </div>
    );
};
