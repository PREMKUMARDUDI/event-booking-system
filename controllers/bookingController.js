import Booking from "../models/bookingModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

export const bookTicket = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.availableTickets <= 0) {
      return res.status(400).json({ message: "Housefull" });
    }

    const booking = new Booking({
      event: event._id,
      user: req.user.id,
    });
    await booking.save();

    event.availableTickets -= 1;
    await event.save();

    const user = await User.findById(req.user.id);

    // Background Task: Confirmation
    sendConfirmationEmail(user.email, event.title);

    res.json({ message: "Ticket Booked!", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper: Background Task
const sendConfirmationEmail = (email, eventName) => {
  setTimeout(() => {
    console.log(
      `\n[BACKGROUND] 📧 Sending Confirmation to ${email} for ${eventName}`
    );
  }, 2000);
};
