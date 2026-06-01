import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    useParams,
} from "react-router-dom";

import {
    getDepartment,
} from "../../services/departmentService";

export default function DepartmentDetailsPage() {
    const { id } = useParams();

    const [department, setDepartment] =
        useState<any>();

    useEffect(() => {
        getDepartment(
            Number(id)
        ).then(
            setDepartment
        );
    }, [id]);

    return (
        <Box sx={{ p: 3 }}>
            <Card>
                <CardContent>
                    <Typography
                        variant="h4"
                    >
                        {
                            department?.name
                        }
                    </Typography>

                    <Typography>
                        Company:
                        {" "}
                        {
                            department?.company_name
                        }
                    </Typography>

                    <Typography>
                        Active Employees:
                        {" "}
                        {
                            department?.active_employee_count
                        }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}