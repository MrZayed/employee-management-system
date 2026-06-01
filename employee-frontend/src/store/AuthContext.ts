import { createContext, useContext } from "react";

export interface User {
    id: number;
    email: string;
    role: "ADMIN" | "HR_MANAGER" | "EMPLOYEE";
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;

    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
});

// hook
export const useAuth = () => useContext(AuthContext);