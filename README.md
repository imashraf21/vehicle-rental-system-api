# 🚗 Vehicle Rental System API

This repository contains the backend API for a Vehicle Rental Management System, designed to handle user authentication, vehicle management, and rental bookings.

| **[Live API URL](https://vehicle-rental-system-taupe.vercel.app/)**

---

## ✨ Features

### User Management (`/api/v1/users`)

-   **Registration & Authentication:** Create users with mandatory fields (name, email, password, phone, role).
-   **Role-Based Access:** Supports two distinct roles: `admin` and `customer`.
-   **Data Integrity:** Enforces unique, lowercase emails and minimum password length ($\ge 6$ characters).
-   **User Profiles:** Retrieve and delete user records.

### Vehicle Management (`/api/v1/vehicles`)

-   **Fleet CRUD:** Create, retrieve, update, and delete vehicle records.
-   **Constraints:** Enforces unique registration numbers and positive daily rent prices.
-   **Type Management:** Restricts vehicle types to 'car', 'bike', 'van', or 'SUV'.
-   **Availability Tracking:** Maintains an `availability_status` ('available' or 'booked').

### Booking Management (`/api/v1/bookings`)

-   **Atomic Booking Creation:** Calculates the `total_price` based on vehicle's `daily_rent_price` and rental duration in a single, atomic database query.
-   **Data Linking:** Utilizes Foreign Keys to link bookings to specific users `customer_id` and vehicles `vehicle_id`.
-   **Status Lifecycle:** Manages booking status: 'active', 'cancelled', 'returned'.
-   **Business Logic Enforcement:**
    -   **Customer Cancellation:** Allows cancellation only if the `rent_start_date` has not passed.
    -   **Admin/System Return:** Admins can mark a booking as 'returned', which automatically updates the associated vehicle's status to 'available'.
    -   **Date Constraint:** Enforces that the `rent_end_date` must be after the `rent_start_date`.

---

## 💻 Technology Stack

| Category            | Technology                  |
| :------------------ | :-------------------------- |
| **Backend Runtime** | **Node.js**                 |
| **Framework**       | **Express.js**              |
| **Database**        | **PostgreSQL (via NeonDB)** |
| **Database Client** | `pg`                        |
| **Language**        | **TypeScript**              |

---

## 🚀 Setup & Usage Instructions

Follow these steps to get the Vehicle Rental System API running locally.

### Prerequisites

-   **Node.js** (LTS version recommended)
-   **PostgreSQL** database (Local instance or an external service like NeonDB)
-   **Git**

### Step 1: Clone the Repository

```bash
git clone [https://github.com/imashraf21/vehicle-rental-system-api.git](https://github.com/imashraf21/vehicle-rental-system-api.git)
cd vehicle-rental-system-api
npm install
npm run dev
```
