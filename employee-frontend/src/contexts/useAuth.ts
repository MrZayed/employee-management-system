import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import type { User } from "../store/AuthContext";

export const useAuth = () => {
    return useContext(AuthContext);
};

export type { User };