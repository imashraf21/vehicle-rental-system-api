import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUserDB = async (payload: Record<string, unknown>) => {
	const { name, email, password, phone, role } = payload;

	const hashedPassword = await bcrypt.hash(password as string, 12);

	const result = await pool.query(
		`INSERT INTO users(name, email, password, phone, role) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, name, email, phone, role`,
		[name, email, hashedPassword, phone, role]
	);

	return result;
};

const getAllUserDB = async () => {
	const result = await pool.query(
		`SELECT id,name,email,phone,role FROM users`
	);

	return result;
};

const getSingleUserDB = async (id: string) => {
	const result = await pool.query(
		`SELECT id,name,email,phone,role FROM users WHERE id = $1`,
		[id]
	);

	return result;
};

const updateUserDB = async (
	name: string,
	email: string,
	phone: string,
	id: string
) => {
	const result = await pool.query(
		`UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING id, name, email, phone, role`,
		[name, email, phone, id]
	);

	return result;
};

const deleteUserDB = async (id: string) => {
	const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);

	return result;
};

export const userServices = {
	createUserDB,
	getAllUserDB,
	getSingleUserDB,
	updateUserDB,
	deleteUserDB,
};
