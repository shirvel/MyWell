import "./App.css";
import "./index.css";
import "./tailwind.css";
import { MealPlanner } from "./MealPlanner/MealPlanner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "./common/PageNotFound";

export const App = () => {
	return (
		<div className="flex-grow vcenter">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MealPlanner />} />
					<Route path="meal-planner" element={<MealPlanner />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
