import { pool } from "../../config/db";
import config from "../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

const loginUserDB = async (email: string, password: string) => {
	const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
		email,
	]);

	if (result.rows.length === 0) {
		throw new Error("User not found");
	}

	const user = result.rows[0];
	const matchPassword = await bcrypt.compare(password, user.password);
	if (!matchPassword) {
		throw new Error("Invalid Credentials");
	}

	const jwtPayload = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const token = jwt.sign(jwtPayload, config.jwtSecret as string, {
		expiresIn: "7d",
	});

	return { token, user };
};

export const authServices = {
	createUserDB,
	loginUserDB,
};
