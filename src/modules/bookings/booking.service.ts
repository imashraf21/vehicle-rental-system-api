import { pool } from "../../config/db";

const createBookingDB = async (payload: Record<string, unknown>) => {
	const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

	// const priceResult = await pool.query(
	// 	`SELECT daily_rent_price FROM vehicles WHERE id=$1`,
	// 	[vehicle_id]
	// );

	// const dailyPrice = priceResult.rows[0].daily_rent_price as number;
	// const startDate = new Date(rent_start_date as string);
	// const endDate = new Date(rent_end_date as string);
	// const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
	// const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	// const totalPrice = totalDays * dailyPrice;

	// const newStatus = "active";

	const result = await pool.query(
		`
        WITH vehicle_details AS (
            SELECT v.daily_rent_price, ($4::DATE - $3::DATE) AS rent_days 
            FROM vehicles v WHERE v.id=$2
            )
            
            INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) 
            SELECT $1, $2, $3, $4, vd.daily_rent_price * vd.rent_days
            FROM vehicle_details vd
            RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
		[customer_id, vehicle_id, rent_start_date, rent_end_date]
	);

	// if (result.rows.length === 0) {
	// 	throw new Error(`Vehicle with ID ${vehicle_id} not found.`);
	// }

	return result;
};

const getAllBookingDB = async () => {
	const result = await pool.query(`SELECT * FROM bookings`);

	return result;
};

const getSingleBookingDB = async (id: string) => {
	const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);

	return result;
};

const updateBookingDB = async (
	payload: Record<string, unknown>,
	id: string
) => {
	const { status } = payload;
	const result = await pool.query(
		`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
		[status, id]
	);

	return result;
};

const deleteBookingDB = async (id: string) => {
	const result = await pool.query(`DELETE FROM bookings WHERE id=$1`, [id]);

	return result;
};

export const bookingServices = {
	createBookingDB,
	getAllBookingDB,
	getSingleBookingDB,
	updateBookingDB,
	deleteBookingDB,
};
