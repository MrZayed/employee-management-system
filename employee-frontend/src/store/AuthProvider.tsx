import { useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./AuthContext";

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] =
        useState(
            !!localStorage.getItem("accessToken")
        );

    const login = (token: string) => {
        localStorage.setItem(
            "accessToken",
            token
        );

        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}