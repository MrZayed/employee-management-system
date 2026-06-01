import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
} from "@mui/material";

import {
    useParams,
} from "react-router-dom";

import Loader from "../../components/common/Loader";

import {
    getCompany,
} from "../../services/companyService";

import type {
    Company,
} from "../../types/Company";

export default function CompanyViewPage() {
    const { id } = useParams();

    const [company, setCompany] =
        useState<Company | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const load =
            async () => {
                try {
                    const data =
                        await getCompany(
                            Number(id)
                        );

                    setCompany(data);
                } finally {
                    setLoading(false);
                }
            };

        load();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <Box
            sx={{
                padding: 3,
            }}
        >
            <Card>
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h1"
                    >
                        {company?.name}
                    </Typography>

                    <Divider
                        sx={{
                            my: 2,
                        }}
                    />

                    <Typography>
                        Address:
                        {" "}
                        {company?.address}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 2,
                        }}
                    >
                        Departments:
                        {" "}
                        {
                            company?.total_departments
                        }
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                        }}
                    >
                        Employees:
                        {" "}
                        {
                            company?.total_employees
                        }
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                        }}
                    >
                        Active Employees:
                        {" "}
                        {
                            company?.active_employees
                        }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}