import express from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin", "customer"), bookingControllers.createBooking);

router.get("/", auth("admin", "customer"), bookingControllers.getAllBooking);

// router.get("/:id", bookingControllers.getSingleBooking);

router.put("/:id", auth("admin", "customer"), bookingControllers.updateBooking);

// router.delete("/:id", bookingControllers.deleteBooking);

export const bookingRoutes = router;
