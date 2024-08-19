import Attendance from '../models/attendance.model.js';
import User from '../models/user.model.js';
import Event from '../models/event.model.js';

// Function to get present buyers with specific details
const getAttendanceDetails = async (req, res) => {
    try {
        const presentBuyers = await Attendance.find({ attendancestatus: 'present' })
            .populate({
                path: 'buyer',
                select: 'age gender'
            })
            .populate({
                path: 'event',
                select: 'name'
            });

        const result = presentBuyers.map(attendance => ({
            userId: attendance.buyer._id,
            eventId: attendance.event._id,
            eventName: attendance.event.name,
            userAge: attendance.buyer.age,
            userGender: attendance.buyer.gender,
            attendanceStatus: attendance.attendancestatus
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
        const requiredEvent = await Event.findOne({ eventName });

        if (!requiredEvent) {
            return res.status(404).send({ message: 'Event not found' });
        }
        const eventID = requiredEvent._id;

        const presentBuyers = await Attendance.find({ event: eventID , attendancestatus: 'present'})
            .populate({
                path: 'buyer',
                select: 'age gender'
            })
            .populate({
                path: 'event',
                select: 'name'
            });

        const result = presentBuyers.map(attendance => ({
            userId: attendance.buyer._id,
            eventId: attendance.event._id,
            eventName: attendance.event.name,
            userAge: attendance.buyer.age,
            userGender: attendance.buyer.gender,
            attendanceStatus: attendance.attendancestatus
        }));
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};


// Add new attendance
const createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).send({message:"Attendance Marked", attendance});
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
        res.status(500).send
    }
}

// Get a single attendance
const getAttendanceByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const userID = await User.findOne({ email });
        const attendance = await Attendance.findOne({userID});
        if (!attendance) {
            return res.status(404).send({ message: 'Attendance not found' });
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update attendance
const updateAttendance = async (req, res) => {
    const email = req.params.email;
    try {
        const attendance = await Attendance.findOneAndUpdate({email}, req.body, { new: true, runValidators: true });
        if (!attendance) {
            return res.status(404).send({ message: 'Attendance not found' });
        }
        res.send(attendance);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

// Delete attendance
const deleteAttendance = async (req, res) => {
    try {
        const email = req.params.email;
        const attendance = await Attendance.findOneAndDelete({email});
        if (!attendance) {
            return res.status(404).send({ message: 'Attendance not found' });
        }
        res.send(attendance);
    } catch (error) {
        res.status(500).send(error);
    }
}

export { createAttendance, getAttendance, getAttendanceByEmail, updateAttendance, deleteAttendance, getAttendanceDetailsForEvent };