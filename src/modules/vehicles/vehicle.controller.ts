import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.createVehicleDB(req.body);

		res.status(201).json({
			success: true,
			message: "Vehicle created successfully",
			data: result.rows[0],
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getAllVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.getAllVehicleDB();

		res.status(200).json({
			success: true,
			message: "Vehicles retrieved successfully",
			data: result.rows,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getSingleVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.getSingleVehicleDB(req.params.id!);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "Vehicle not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Vehicle retrieved successfully",
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

const updateVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.updateVehicleDB(
			req.body,
			req.params.id!
		);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "Vehicle not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Vehicle updated successfully",
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

const deleteVehicle = async (req: Request, res: Response) => {
	try {
		const result = await vehicleServices.deleteVehicleDB(req.params.id!);

		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: "Vehicle not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Vehicle deleted successfully",
			});
		}
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const vehicleControllers = {
	createVehicle,
	getAllVehicle,
	getSingleVehicle,
	updateVehicle,
	deleteVehicle,
};
