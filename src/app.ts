import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoute } from "./modules/users/user.routes";

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
app.use("/api/v1/users", userRoute);

export default app;
