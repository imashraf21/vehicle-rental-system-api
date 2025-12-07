import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingServices.createBookingDB(req.body);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "Booking failed",
			});
		} else {
			res.status(201).json({
				success: true,
				message: "Booking created successfully",
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

const getAllBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingServices.getAllBookingDB();

		res.status(200).json({
			success: true,
			message: "Bookings retrieved successfully",
			data: result.rows,
		});
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getSingleBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingServices.getSingleBookingDB(req.params.id!);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "Booking not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Booking retrieved successfully",
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

const updateBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingServices.updateBookingDB(
			req.body,
			req.params.id!
		);

		if (result.rows.length === 0) {
			res.status(404).json({
				success: false,
				message: "Booking not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Booking updated successfully",
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

const deleteBooking = async (req: Request, res: Response) => {
	try {
		const result = await bookingServices.deleteBookingDB(req.params.id!);

		if (result.rowCount === 0) {
			res.status(404).json({
				success: false,
				message: "Booking not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Booking deleted successfully",
			});
		}
	} catch (error: any) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const bookingControllers = {
	createBooking,
	getAllBooking,
	getSingleBooking,
	updateBooking,
	deleteBooking,
};
