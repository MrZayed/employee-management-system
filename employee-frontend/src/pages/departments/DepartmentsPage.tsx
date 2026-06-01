import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
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
    getDepartments,
    deleteDepartment,
} from "../../services/departmentService";

import type {
    Department,
} from "../../types/Department";

import { toast } from "react-toastify";

export default function DepartmentsPage() {
    const navigate = useNavigate();

    const [departments, setDepartments] =
        useState<Department[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadDepartments =
        async () => {
            try {
                const data =
                    await getDepartments();

                setDepartments(data);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleDelete =
        async (id: number) => {
            if (
                !window.confirm(
                    "Delete department?"
                )
            )
                return;

            await deleteDepartment(id);

            toast.success(
                "Department deleted"
            );

            loadDepartments();
        };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Department",
            flex: 1,
        },
        {
            field: "company_name",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "active_employee_count",
            headerName: "Active Employees",
            width: 180,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        size="small"
                        onClick={() =>
                            navigate(
                                `/departments/${params.row.id}`
                            )
                        }
                    >
                        View
                    </Button>

                    <Button
                        size="small"
                        onClick={() =>
                            navigate(
                                `/departments/edit/${params.row.id}`
                            )
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        color="error"
                        size="small"
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
                    component="h1"
                >
                    Departments
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate(
                            "/departments/create"
                        )
                    }
                >
                    Add Department
                </Button>
            </Box>

            <DataGrid
                rows={departments}
                columns={columns}
                autoHeight
            />
        </Box>
    );
}