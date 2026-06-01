// EmployeeProfilePage.tsx

import { useAuth } from "../../store/AuthContext";

export default function EmployeeProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div>
            <h2>My Profile</h2>
            <p>Name: {user.email}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.email}</p>
            <p>Department: {user.email}</p>
        </div>
    );
}