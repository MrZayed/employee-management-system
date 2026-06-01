import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
    Button,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import {
    employeeSchema,
} from "../../utils/employeeValidation";

import type { Company } from "../../types/Company";
import type { Department } from "../../types/Department";
import type { Employee } from "../../types/Employee";
import type { EmployeeFormData } from "../../types/EmployeeFormData";

import {
    createEmployee,
    updateEmployee,
    getEmployee,
} from "../../services/employeeService";

import {
    getCompanies,
} from "../../services/companyService";

import {
    getDepartments,
} from "../../services/departmentService";

export default function EmployeeFormPage() {
    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [companies, setCompanies] =
        useState<Company[]>([]);

    const [departments, setDepartments] =
        useState<Department[]>([]);

    const [loading, setLoading] =
        useState(true);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            role: "EMPLOYEE",
        },
    });

    const selectedCompany = watch("company");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    companiesData,
                    departmentsData,
                ] = await Promise.all([
                    getCompanies(),
                    getDepartments(),
                ]);

                setCompanies(companiesData);
                setDepartments(departmentsData);

                if (isEdit && id) {
                    const employee: Employee =
                        await getEmployee(Number(id));

                    reset({
                        name: employee.name,
                        email: employee.email,
                        mobile: employee.mobile,
                        address: employee.address,
                        title: employee.title,
                        hire_date: employee.hire_date,
                        company: employee.company,
                        department: employee.department,

                        password: "",
                        role: "EMPLOYEE",
                    });
                }
            } catch {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, isEdit, reset]);

    const filteredDepartments =
        selectedCompany
            ? departments.filter(
                (department) =>
                    department.company ===
                    Number(selectedCompany)
            )
            : departments;

    const onSubmit = async (
        data: EmployeeFormData
    ) => {
        console.log("FORM SUBMITTED");
        console.log(data);

        try {
            if (isEdit) {
                console.log("CALLING UPDATE");

                await updateEmployee(
                    Number(id),
                    data
                );

                console.log("UPDATE SUCCESS");

                toast.success(
                    "Employee updated"
                );
            } else {
                console.log("CALLING CREATE");

                await createEmployee(data);

                toast.success(
                    "Employee created"
                );
            }

            navigate("/employees");
        } catch (error) {
            console.error(error);

            toast.error(
                "Operation failed"
            );
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                    >
                        {isEdit
                            ? "Edit Employee"
                            : "Create Employee"}
                    </Typography>

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                    >
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={
                                errors.name?.message
                            }
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={
                                errors.email?.message
                            }
                        />

                        {!isEdit && (
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                margin="normal"
                                {...register(
                                    "password"
                                )}
                                error={
                                    !!errors.password
                                }
                                helperText={
                                    errors.password
                                        ?.message
                                }
                            />
                        )}

                        <TextField
                            select
                            fullWidth
                            label="Role"
                            margin="normal"
                            defaultValue="EMPLOYEE"
                            {...register("role")}
                        >
                            <MenuItem value="ADMIN">
                                ADMIN
                            </MenuItem>

                            <MenuItem value="HR_MANAGER">
                                HR_MANAGER
                            </MenuItem>

                            <MenuItem value="EMPLOYEE">
                                EMPLOYEE
                            </MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            label="Mobile"
                            margin="normal"
                            {...register("mobile")}
                            error={
                                !!errors.mobile
                            }
                            helperText={
                                errors.mobile?.message
                            }
                        />

                        <TextField
                            fullWidth
                            label="Address"
                            margin="normal"
                            {...register(
                                "address"
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Title"
                            margin="normal"
                            {...register("title")}
                        />

                        <TextField
                            fullWidth
                            label="Hire Date"
                            type="date"
                            margin="normal"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register(
                                "hire_date"
                            )}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Company"
                            margin="normal"
                            defaultValue=""
                            {...register(
                                "company",
                                {
                                    valueAsNumber: true,
                                }
                            )}
                        >
                            {companies.map(
                                (
                                    company
                                ) => (
                                    <MenuItem
                                        key={
                                            company.id
                                        }
                                        value={
                                            company.id
                                        }
                                    >
                                        {
                                            company.name
                                        }
                                    </MenuItem>
                                )
                            )}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Department"
                            margin="normal"
                            {...register("department", {
                                valueAsNumber: true,
                            })}
                            error={!!errors.department}
                        >
                            {filteredDepartments.map(
                                (department) => (
                                    <MenuItem
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </MenuItem>
                                )
                            )}
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                            }}
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? "Saving..."
                                : "Save"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}