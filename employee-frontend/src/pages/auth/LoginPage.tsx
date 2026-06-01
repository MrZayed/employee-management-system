import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { loginSchema } from "../../utils/validation";
import { useAuth } from "../../contexts/useAuth";
import type { LoginRequest } from "../../types/Auth";
import { loginRequest } from "../../services/authService";



export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (
        data: LoginRequest
    ) => {
        try {
            const response =
                await loginRequest(data);

            localStorage.setItem(
                "accessToken",
                response.access
            );

            localStorage.setItem(
                "refreshToken",
                response.refresh
            );

            login(response.access);

            toast.success(
                "Login successful"
            );

            navigate("/companies");
        } catch {
            toast.error(
                "Invalid credentials"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f4f6f8",
            }}
        >
            <Card
                sx={{
                    width: 400,
                }}
            >
                <CardContent>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            marginBottom: 3,
                        }}
                    >
                        Login
                    </Typography>

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                    >
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            {...register("username")}
                            error={!!errors.username}
                            helperText={
                                errors.username?.message
                            }
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
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

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 2,
                            }}
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? "Loading..."
                                : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}