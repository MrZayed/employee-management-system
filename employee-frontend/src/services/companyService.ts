import api from "../api/axios";
import type { Company } from "../types/Company";

export const getCompanies = async (): Promise<Company[]> => {
    const response = await api.get(
        "companies/"
    );

    return response.data;
};

export const getCompany = async (
    id: number
): Promise<Company> => {
    const response = await api.get(
        `companies/${id}/`
    );

    return response.data;
};