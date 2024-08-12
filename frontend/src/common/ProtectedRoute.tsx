import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({
	element,
}: {
	element: React.ReactElement;
}) => {
	const location = useLocation();

	if (!localStorage.getItem("userId")) {
		// Redirect to login if not authenticated
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return element;
};
