import "./App.css";
import "./index.css";
import "./tailwind.css";
import { MealPlanner } from "./MealPlanner/MealPlanner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "./common/PageNotFound";
import { NavBar } from "./common/NavBar";
import { WeekReflection } from "./WeekReflection/WeekRelection";
import { RegisterPage } from "./Registration/RegisterPage";

export const App = () => {
	return (
		<div className="flex-grow vcenter">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<MealPlanner />} />
					<Route path="meal-planner" element={<MealPlanner />} />
					<Route path="week-reflection" element={<WeekReflection />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
