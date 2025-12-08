import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import isOwnerOrAdmin from "../../middleware/isAdminOrAdmin";

const router = express.Router();

// router.post("/", userControllers.createUser);

router.get("/", auth("admin"), userControllers.getAllUser);

// router.get(
// 	"/:id",
// 	auth("admin", "customer"),
// 	isOwnerOrOwn,
// 	userControllers.getSingleUser
// );

router.put(
	"/:id",
	auth("admin", "customer"),
	isOwnerOrAdmin,
	userControllers.updateUser
);

router.delete("/:id", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
