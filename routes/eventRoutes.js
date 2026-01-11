import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { verifyToken, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", verifyToken, checkRole(["Organizer"]), createEvent);
router.put("/:id", verifyToken, checkRole(["Organizer"]), updateEvent);

export default router;
