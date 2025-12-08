import { Request, Response } from "express";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

// const createUser = async (req: Request, res: Response) => {
// 	try {
// 		const result = await userServices.createUserDB(req.body);

// 		res.status(201).json({
// 			success: true,
// 			message: "user created",
// 			data: result.rows[0],
// 		});
// 	} catch (error: any) {
// 		res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

const getAllUser = async (req: Request, res: Response) => {
	try {
		const result = await userServices.getAllUserDB();

		res.status(200).json({
			success: true,
			message: "Users retrieved successfully",
			data: result.rows,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// const getSingleUser = async (req: Request, res: Response) => {
// 	try {
// 		const result = await userServices.getSingleUserDB(
// 			req.params.id as string
// 		);

// 		if (result.rows.length === 0) {
// 			res.status(404).json({
// 				success: false,
// 				message: "User not found",
// 			});
// 		} else {
// 			res.status(200).json({
// 				success: true,
// 				message: "User retrieved successfully",
// 				data: result.rows[0],
// 			});
// 		}
// 	} catch (error: any) {
// 		res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

const updateUser = async (req: Request, res: Response) => {
	const { name, email, phone, role } = req.body;
	const { role: currentRole } = (req as JwtPayload).user;

	try {
		const result = await userServices.updateUserDB(
			name,
			email,
			phone,
			role,
			currentRole,
			req.params.id as string
		);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "User not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "User updated successfully",
				data: result.rows[0],
			});
		}
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await userServices.deleteUserDB(req.params.id!);

		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: "User not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		}
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const userControllers = {
	// createUser,
	getAllUser,
	// getSingleUser,
	updateUser,
	deleteUser,
};
