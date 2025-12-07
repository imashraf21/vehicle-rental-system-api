import express from "express";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/", bookingControllers.createBooking);

router.get("/", bookingControllers.getAllBooking);

router.get("/:id", bookingControllers.getSingleBooking);

router.put("/:id", bookingControllers.updateBooking);

router.delete("/:id", bookingControllers.deleteBooking);

export const bookingRoutes = router;
