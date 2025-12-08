# 🚗 Vehicle Rental System API

This repository contains the backend API for a Vehicle Rental Management System, designed to handle user authentication, vehicle management, and rental bookings.

| **[Live API URL](https://vehicle-rental-system-taupe.vercel.app/)**

---

## ✨ Features

### User Management (`/api/v1/users`)

-   **Registration & Authentication:** Create users with mandatory fields (name, email, password, phone, role).
-   **Role-Based Access:** Supports two distinct roles: `admin` and `customer`.
-   **Data Integrity:** Enforces unique, lowercase emails and minimum password length ($\ge 6$ characters).
-   **User Profiles:** Retrieve user records.

### Vehicle Management (`/api/v1/vehicles`)

-   **CRUD:** Create, retrieve, update, and delete vehicle records.
-   **Constraints:** Enforces unique registration numbers and positive daily rent prices.
-   **Type Management:** Restricts vehicle types to 'car', 'bike', 'van', or 'SUV'.
-   **Availability Tracking:** Maintains an `availability_status` ('available' or 'booked').

### Booking Management (`/api/v1/bookings`)

-   **Atomic Booking Creation:** Calculates the `total_price` based on vehicle's `daily_rent_price` upon creation
-   **Data Linking:** Utilizes Foreign Keys to link bookings to specific users `customer_id` and vehicles `vehicle_id`.
-   **Status Lifecycle:** Manages booking status: 'active', 'cancelled', 'returned'.
-   **Business Logic Enforcement:**
    -   **Customer Cancellation:** Allows cancellation only if the `rent_start_date` has not passed.
    -   **Admin/System Return:** Admins can mark a booking as 'returned', which automatically updates the associated vehicle's status to 'available'.
    -   **Date Constraint:** Enforces that the `rent_end_date` must be after the `rent_start_date`.

### Auth Management (`/api/v1/auth`)

-   **Authentication Core:** Manages user authentication and session control using secure `JSON Web Tokens` (JWTs).
-   **User Registration:** The `POST /register` endpoint facilitates the creation of new user accounts (Customers or Admin).
-   **User Login & Token Issuance:** The `POST /login` endpoint authenticates credentials and issues Tokens with 7d validity.
-   **Security:** All user passwords are saved using strong, one-way hashing algorithms, such as bcrypt, to ensure maximum data protection.

---

## 💻 Technology Stack

| Category                      | Technology                            |
| :---------------------------- | :------------------------------------ |
| **Backend Runtime**           | **Node.js**                           |
| **Framework**                 | **Express.js**                        |
| **Database**                  | **PostgreSQL (via NeonDB)**           |
| **Database Client**           | `pg`                                  |
| **Authentication & Security** | **bcrypt (for password hashing)**     |
| **Authentication & Security** | **jsonwebtoken (for JWT management)** |
| **Language**                  | **TypeScript**                        |

---

## 🚀 Setup & Usage Instructions

Follow these steps to get the Vehicle Rental System API running locally.

### Prerequisites

-   **Node.js** (LTS version recommended)
-   **PostgreSQL** database (Local instance or an external service like NeonDB)
-   **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/imashraf21/vehicle-rental-system-api.git
cd vehicle-rental-system-api
npm install
npm run dev
```

### Step 2: .env file

```bash
PORT
CONNECTION_STR
JWT_SECRET
```

### Admin Credential

```bash
{
    "email": "admin@xyz.com",
    "password": "admin123"
}
```

### Customer Credential

```bash
{
    "email": "customer@xyz.com",
    "password": "customer123",
}
```

## 📚 Additional Resources

-   **[API Reference](API_REFERENCE.md)** - Detailed endpoint documentation with request/response examples
