import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

// express
const app = express();
app.use(express.json());

// DB
initDB();

// root
app.get("/", (req: Request, res: Response) => {
	// res.send("Vehicle Rental Management...");
	res.status(200).json({
		message: "Vehicle Rental Management API",
		path: req.path,
	});
});

// Users CRUD
app.use("/api/v1/users", userRoutes);

// Vehicles CRUD
app.use("/api/v1/vehicles", vehicleRoutes);

// Bookings CRUD
app.use("/api/v1/bookings", bookingRoutes);

// Auth
// app.use("/api/v1/auth");

// 404
app.use((req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
		path: req.path,
	});
});

export default app;
