export interface Company {
    id: number;
    name: string;
    address: string;

    total_departments?: number;
    total_employees?: number;
    active_employees?: number;
}