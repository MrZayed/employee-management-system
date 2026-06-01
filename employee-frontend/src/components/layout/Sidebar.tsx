import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // const isAdminOrHr = user?.role === "ADMIN" || user?.role === "HR_MANAGER";
    const isAdminOrHr = 1; // For testing purposes 
    return (
        <List sx={{ width: 250 }}>

            {isAdminOrHr && (
                <>
                    <ListItemButton onClick={() => navigate("/companies")}>
                        <ListItemText primary="Companies" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/departments")}>
                        <ListItemText primary="Departments" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/employees")}>
                        <ListItemText primary="Employees" />
                    </ListItemButton>

                    <Divider />
                </>
            )}

            <ListItemButton onClick={() => navigate("/employees/me")}>
                <ListItemText primary="My Profile" />
            </ListItemButton>

        </List>
    );
}