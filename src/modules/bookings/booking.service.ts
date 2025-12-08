import { pool } from "../../config/db";

const getVehicleStatus = async (id: number): Promise<boolean | null> => {
	const result = await pool.query(
		`SELECT availability_status FROM vehicles WHERE id=$1`,
		[id]
	);

	if (result.rows.length === 0) return null;
	else if (result.rows[0].availability_status === "available") return true;
	else return false;
};

const getVehicleID = async (id: number): Promise<number> => {
	const result = await pool.query(
		`SELECT vehicle_id FROM bookings WHERE id=$1`,
		[id]
	);
	return result.rows[0].vehicle_id;
};

const validateDateCustomerID = async (
	id: number,
	cus_id: number
): Promise<boolean | null> => {
	const result = await pool.query(
		`SELECT customer_id, rent_start_date FROM bookings WHERE id=$1`,
		[id]
	);

	if (result.rows.length === 0) return null;
	else if (result.rows[0].customer_id === cus_id) {
		const startDate = new Date(result.rows[0].rent_start_date);
		const currentDate = new Date();

		if (currentDate < startDate) return true;
		else throw new Error("The rental period has already started");
	} else return false;
};

const getTotalPrice = async (
	id: number,
	startDate: Date,
	endDate: Date
): Promise<number> => {
	const result = await pool.query(
		`SELECT daily_rent_price FROM vehicles WHERE id=$1`,
		[id]
	);
	const dailyRentPrice = result.rows[0].daily_rent_price as number;

	const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
	const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	const totalPrice = totalDays * dailyRentPrice;
	return totalPrice;
};

const createBookingDB = async (
	payload: Record<string, unknown>,
	payloadRole: Record<string, unknown>
) => {
	const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
	const { role, id } = payloadRole;

	// if not admin, check if the booking is for owner
	if (role !== "admin" && id !== customer_id)
		throw new Error(`You can't book for others`);

	// check date
	if (
		new Date(rent_start_date as string) > new Date(rent_end_date as string)
	) {
		throw new Error(`End date must be after start date`);
	}

	// availability_status
	const isAvailable = await getVehicleStatus(vehicle_id as number);

	if (isAvailable === null)
		throw new Error(`Vehicle with ID ${vehicle_id} not found`);
	if (!isAvailable) {
		throw new Error(`Vehicle with ID ${vehicle_id} is already booked`);
	}
	const totalPrice = await getTotalPrice(
		vehicle_id as number,
		new Date(rent_start_date as string),
		new Date(rent_end_date as string)
	);

	const result = await pool.query(
		`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *
		`,
		[customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
	);

	if (result.rows.length !== 0) {
		const availabilityStatus = "booked";

		await pool.query(
			`UPDATE vehicles SET availability_status=$1 WHERE id=$2`,
			[availabilityStatus, vehicle_id]
		);
	}

	return result;
};

const getAllBookingDB = async (payload: Record<string, unknown>) => {
	const { role, id } = payload;

	if (role === "admin") {
		const result = await pool.query(`SELECT * FROM bookings`);
		return result;
	} else {
		const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
			id,
		]);
		return result;
	}
};

// const getSingleBookingDB = async (id: string) => {
// 	const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);

// 	return result;
// };

const updateBookingDB = async (
	payload: Record<string, unknown>,
	id: string,
	payloadRole: Record<string, unknown>
) => {
	const { status } = payload;
	const { role, id: customer_id } = payloadRole;

	if (role === "customer") {
		const isValidCustomer = await validateDateCustomerID(
			Number(id),
			customer_id as number
		);

		if (isValidCustomer === null)
			throw new Error(`Booking with ID ${id} not found`);

		if (!isValidCustomer || status !== "cancelled")
			throw new Error("You're not an admin.");
	}
	const result = await pool.query(
		`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
		[status, id]
	);

	const availabilityStatus = status === "active" ? "booked" : "available";
	const vehicleID = await getVehicleID(Number(id));
	console.log(status, availabilityStatus, vehicleID);

	await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
		availabilityStatus,
		vehicleID,
	]);

	return result;
};

// const deleteBookingDB = async (id: string) => {
// 	const result = await pool.query(`DELETE FROM bookings WHERE id=$1`, [id]);

// 	return result;
// };

export const bookingServices = {
	createBookingDB,
	getAllBookingDB,
	// getSingleBookingDB,
	updateBookingDB,
	// deleteBookingDB,
};
