import express from "express";
import { bookTicket } from "../controllers/bookingController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", verifyToken, checkRole(["Customer"]), bookTicket);

export default router;
