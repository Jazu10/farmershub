import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(
        (state) => state.auth,
    );
    return (
        <>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false)
                            return <Redirect to="/" />;

                        if (isAdmin === true && user.role !== "admin")
                            return <Redirect to="/" />;

                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
};

export default ProtectedRoute;
