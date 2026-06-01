import api from "../api/axios";
import type { Employee } from "../types/Employee";

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await api.get("employees/");
    return response.data;
};

export const getEmployee = async (
    id: number
): Promise<Employee> => {
    const response = await api.get(
        `employees/${id}/`
    );

    return response.data;
};

export const createEmployee = async (
    data: Partial<Employee>
) => {
    const response = await api.post(
        "employees/",
        data
    );

    return response.data;
};

export const updateEmployee = async (
    id: number,
    data: Partial<Employee>
) => {
    const response = await api.put(
        `employees/${id}/`,
        data
    );

    return response.data;
};

export const deleteEmployee = async (
    id: number
) => {
    await api.delete(
        `employees/${id}/`
    );
};