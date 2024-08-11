import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../providers/UserContextProvider";

export const ProtectedRoute = ({
	element,
}: {
	element: React.ReactElement;
}) => {
	const location = useLocation();
	const { userId } = useUserContext();
	if (!userId) {
		// Redirect to login if not authenticated
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return element;
};
