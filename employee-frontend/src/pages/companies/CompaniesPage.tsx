import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import {
    DataGrid,
    type GridColDef,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";

import {
    getCompanies,
} from "../../services/companyService";

import type {
    Company,
} from "../../types/Company";

export default function CompaniesListPage() {
    const navigate = useNavigate();

    const [companies, setCompanies] =
        useState<Company[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadCompanies =
        async () => {
            try {
                const data =
                    await getCompanies();

                setCompanies(data);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        loadCompanies();
    }, []);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "total_departments",
            headerName: "Departments",
            width: 140,
        },
        {
            field: "total_employees",
            headerName: "Employees",
            width: 140,
        },
        {
            field: "active_employees",
            headerName: "Active",
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    onClick={() =>
                        navigate(
                            `/companies/${params.row.id}`
                        )
                    }
                >
                    View
                </Button>
            ),
        },
    ];

    if (loading) return <Loader />;

    return (
        <Box
            sx={{
                padding: 3,
            }}
        >
            <Typography
                component="h1"
                variant="h4"
                sx={{
                    mb: 2,
                }}
            >
                Companies
            </Typography>

            <DataGrid
                rows={companies}
                columns={columns}
                autoHeight
            />
        </Box>
    );
}