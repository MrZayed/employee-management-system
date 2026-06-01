import api from "../api/axios";
import type { Department } from "../types/Department";

export const getDepartments = async (): Promise<Department[]> => {
    const response = await api.get("departments/");
    return response.data;
};

export const getDepartment = async (
    id: number
): Promise<Department> => {
    const response = await api.get(
        `departments/${id}/`
    );

    return response.data;
};

export const createDepartment = async (
    data: Partial<Department>
) => {
    const response = await api.post(
        "departments/",
        data
    );

    return response.data;
};

export const updateDepartment = async (
    id: number,
    data: Partial<Department>
) => {
    const response = await api.put(
        `departments/${id}/`,
        data
    );

    return response.data;
};

export const deleteDepartment = async (
    id: number
) => {
    await api.delete(
        `departments/${id}/`
    );
};