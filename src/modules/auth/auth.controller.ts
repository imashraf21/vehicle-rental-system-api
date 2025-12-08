import { Request, Response } from "express";
import { authServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
	try {
		const result = await authServices.createUserDB(req.body);

		res.status(201).json({
			success: true,
			message: "user created",
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const result = await authServices.loginUserDB(email, password);

		res.status(200).json({
			success: true,
			message: "Sign in successful",
			data: result,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const authController = {
	createUser,
	loginUser,
};
