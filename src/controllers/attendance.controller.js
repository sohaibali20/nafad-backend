import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";

// Function to get present buyers with specific details
const getAttendanceDetails = async (req, res) => {
  try {
    const presentBuyers = await Attendance.find({ attendancestatus: "present" })
      .populate({
        path: "buyer",
        select: "age gender",
      })
      .populate({
        path: "event",
        select: "name",
      });

    const result = presentBuyers.map((attendance) => ({
      userId: attendance.buyer._id,
      eventId: attendance.event._id,
      eventName: attendance.event.name,
      userAge: attendance.buyer.age,
      userGender: attendance.buyer.gender,
      attendanceStatus: attendance.attendancestatus,
    }));

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const getAttendanceDetailsForEvent = async (req, res) => {
  const { eventName } = req.params;

  try {
    // Ensure eventName is provided
    if (!eventName) {
      return res.status(400).send({ message: "Event name is required" });
    }

    // Find the event by its name
    const requiredEvent = await Event.findOne({ name: eventName.trim() });

    // Check if the event exists in the database
    if (!requiredEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    const eventID = requiredEvent._id;

    // Find attendance records for the specific event with 'present' status
    const presentBuyers = await Attendance.find({
      event: eventID,
      attendancestatus: "present",
    })
      .populate({
        path: "buyer",
        select: "age gender",
      })
      .populate({
        path: "event",
        select: "name",
      });

    // Format the response
    const result = presentBuyers.map((attendance) => ({
      userId: attendance.buyer._id,
      eventId: attendance.event._id,
      eventName: attendance.event.name,
      userAge: attendance.buyer.age,
      userGender: attendance.buyer.gender,
      attendanceStatus: attendance.attendancestatus,
    }));

    // Send the response
    res.send(result);
  } catch (error) {
    // Handle any server errors
    res.status(500).send({ message: "Server error", error });
    console.error(error);
  }
};

// Add new attendance
const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).send({ message: "Attendance Marked", attendance });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all attendance
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.send(attendance);
  } catch (error) {
    res.status(500).send;
  }
};

// Get a single attendance
const getAttendanceByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const userID = await User.findOne({ email });
    const attendance = await Attendance.findOne({ userID });
    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update attendance
const updateAttendance = async (req, res) => {
  const email = req.params.email;
  try {
    const attendance = await Attendance.findOneAndUpdate({ email }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }
    res.send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const email = req.params.email;
    const attendance = await Attendance.findOneAndDelete({ email });
    if (!attendance) {
      return res.status(404).send({ message: "Attendance not found" });
    }
    res.send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  createAttendance,
  getAttendance,
  getAttendanceByEmail,
  updateAttendance,
  deleteAttendance,
  getAttendanceDetailsForEvent,
};
