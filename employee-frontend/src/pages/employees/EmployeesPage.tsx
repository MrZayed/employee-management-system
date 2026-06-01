import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
    Chip,
    Typography,
} from "@mui/material";

import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";

import {
    useNavigate,
} from "react-router-dom";

import Loader from "../../components/common/Loader";

import {
    getEmployees,
    deleteEmployee,
} from "../../services/employeeService";

import type {
    Employee,
} from "../../types/Employee";

import { toast } from "react-toastify";

export default function EmployeesPage() {
    const navigate = useNavigate();

    const [employees, setEmployees] =
        useState<Employee[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadEmployees =
        async () => {
            try {
                const data =
                    await getEmployees();

                setEmployees(data);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleDelete =
        async (id: number) => {
            if (
                !window.confirm(
                    "Delete employee?"
                )
            )
                return;

            await deleteEmployee(id);

            toast.success(
                "Employee deleted"
            );

            loadEmployees();
        };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1,
        },
        {
            field: "days_employed",
            headerName:
                "Days Employed",
            width: 150,
        },
        {
            field: "is_active",
            headerName: "Status",
            width: 140,
            renderCell: (params) => (
                <Chip
                    label={
                        params.value
                            ? "Active"
                            : "Inactive"
                    }
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 280,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() =>
                            navigate(
                                `/employees/edit/${params.row.id}`
                            )
                        }
                    >
                        View
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `/employees/edit/${params.row.id}`
                            )
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        color="error"
                        onClick={() =>
                            handleDelete(
                                params.row.id
                            )
                        }
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    if (loading)
        return <Loader />;

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography
                    variant="h4"
                >
                    Employees
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate(
                            "/employees/create"
                        )
                    }
                >
                    Add Employee
                </Button>
            </Box>

            <DataGrid
                rows={employees}
                columns={columns}
                autoHeight
            />
        </Box>
    );
}