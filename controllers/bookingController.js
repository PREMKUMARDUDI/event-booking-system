import Booking from "../models/bookingModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

export const bookTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findOneAndUpdate(
      { _id: id, availableTickets: { $gt: 0 } },
      { $inc: { availableTickets: -1 } },
      { new: true },
    );

    if (!event)
      return res.status(404).json({ message: "Housefull or Event not found" });

    const booking = new Booking({
      event: event._id,
      user: userId,
    });
    await booking.save();

    const user = await User.findById(userId);

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
      `\n[BACKGROUND] 📧 Sending Confirmation to ${email} for ${eventName}`,
    );
  }, 2000);
};
