import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import CompaniesPage from "../pages/companies/CompaniesPage";
import CompanyDetailsPage from "../pages/companies/CompanyDetailsPage";

import DepartmentsPage from "../pages/departments/DepartmentsPage";
import DepartmentDetailsPage from "../pages/departments/DepartmentDetailsPage";

import EmployeesPage from "../pages/employees/EmployeesPage";
import EmployeeCreatePage from "../pages/employees/EmployeeCreatePage";

import ProtectedRoute from "../components/guards/ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import EmployeeProfilePage from "../pages/employees/EmployeeProfilePage";
import EmployeeFormPage from "../pages/employees/EmployeeCreatePage";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected App WITH LAYOUT */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/companies" element={<CompaniesPage />} />
                    <Route path="/companies/:id" element={<CompanyDetailsPage />} />

                    <Route path="/departments" element={<DepartmentsPage />} />
                    <Route path="/departments/:id" element={<DepartmentDetailsPage />} />

                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/employees/create" element={<EmployeeCreatePage />} />
                    <Route
                        path="/employees/create"
                        element={<EmployeeFormPage />}
                    />

                    <Route
                        path="/employees/edit/:id"
                        element={<EmployeeFormPage />}
                    />
                </Route>
            </Route>

            {/* Default */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 FIX */}
            <Route path="*" element={<Navigate to="/companies" replace />} />
            <Route path="/employees/me/" element={<EmployeeProfilePage />} />
        </Routes>
    );
}