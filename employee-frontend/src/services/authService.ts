import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/Auth";


export const loginRequest = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post(
        "auth/token/",
        data
    );

    return response.data;
};