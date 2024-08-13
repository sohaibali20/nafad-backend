import Attendance from '../models/attendance.model.js';

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
        const attendance = await Attendance.findOne({email});
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

export { createAttendance, getAttendance, getAttendanceByEmail, updateAttendance, deleteAttendance };