# Employee Management System (EMS)

A full-stack **Employee Management System** designed to manage companies, departments, and employees with secure **role-based access control**, RESTful APIs, and a modern SPA frontend.

---

## Project Overview

The Employee Management System is a multi-tenant platform that allows organizations to efficiently manage:

- Companies
- Departments
- Employees
- User Accounts & Authentication

The system follows strict **role-based access control (RBAC)** and ensures **data integrity, security, and scalability**.

---

##  Architecture

###  Frontend
- React (TypeScript)
- Single Page Application (SPA)
- REST API integration
- Client-side validation
- Role-based UI rendering

### Backend
- Django  (Python)
- PostgreSQL database
- JWT Authentication
- RESTful API design

###  Database Design (High-Level)
- Company → has many Departments
- Department → belongs to Company
- Employee → belongs to Department & Company
- User → linked to Employee (for login)

---

## Core Features

### Company Management
- Create, Read, Update, Delete (CRUD) companies
- View aggregated data per company:
  - Total departments
  - Total employees

---

###  Department Management
- CRUD operations for departments
- Departments are strictly linked to a company
- View active employee count per department

---

###  Employee Management
- CRUD employee records:
  - Name, Email, Mobile, Address
  - Title, Hire Date, Status (Active/Inactive)
- Automatic calculation of:
  - Days Employed
- User account is created automatically for each employee

---

### Authentication & Authorization
The system implements **Role-Based Access Control (RBAC)**:

#### System Administrator
- Full access to all companies, departments, and employees
- Can create, update, delete everything

#### HR Manager
- Manages only assigned company
- Cannot create/delete companies
- Full CRUD on departments & employees in their company

#### Employee
- Read-only access
- Can view only their profile
- Default landing page: **My Profile**

---

## Security Rules

- JWT-based authentication (or session-based)
- API validates all inputs (email, mobile, etc.)
- Backend enforces:
  - Department-company relationship integrity
  - Role-based authorization rules
- Client-side validation is NOT trusted

---

## Business Logic

- Automatically calculate:
  - Number of departments per company
  - Number of employees per company
- Calculate:
  - Days Employed based on hire date
- Block invalid assignments:
  - Employee cannot be assigned to department outside their company

---

## Frontend Requirements

- Login Page
- Companies List / View Page
- Departments List / View Page
- Employees List / Create / Edit / View Pages

### UI Rules:
- Strict form validation (email, mobile)
- Department dropdown filters based on selected company
- Loading states for all API calls
- Friendly error handling (toasts/messages)

---

## API Design Principles

- RESTful architecture
- Standard HTTP methods:
  - GET → Fetch data
  - POST → Create data
  - PATCH → Update data
  - DELETE → Remove data

- Backend always re-validates:
  - Email format
  - Mobile format
  - Business rules integrity

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/MrZayed/employee-management-system.git
cd employee-management-system
```
### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### 2.Frontend Setup

```Bash
cd frontend
npm install
npm run dev
```