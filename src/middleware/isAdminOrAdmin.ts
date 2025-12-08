import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
	const userRole = (req as JwtPayload).user?.role;
	const userID = (req as JwtPayload).user?.id;

	if (userRole === "admin" || userID === Number(req.params.id)) {
		return next();
	}

	return res.status(403).json({
		success: false,
		message: "Unauthorized: Not admin or owner",
	});
};

export default isOwnerOrAdmin;
