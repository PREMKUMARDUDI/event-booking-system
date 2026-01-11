import Event from "../models/eventModel.js";
import Booking from "../models/bookingModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, availableTickets } = req.body;
    const newEvent = new Event({
      title,
      description,
      date,
      availableTickets,
      organizer: req.user.id,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Background Task: Notification
    notifyCustomers(event._id, event.title);

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper: Background Task
const notifyCustomers = async (eventId, eventName) => {
  console.log(`\n[BACKGROUND] 🔔 Processing notifications for: ${eventName}`);
  const bookings = await Booking.find({ event: eventId }).populate(
    "user",
    "email"
  );

  bookings.forEach((booking) => {
    console.log(
      `--> Emailing: ${booking.user.email} | Event Updated: "${eventName}"`
    );
  });
};
