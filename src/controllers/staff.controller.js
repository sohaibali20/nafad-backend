import Staff from '../models/staff.model.js';


// Create a new staff
const createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).send(staff);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all staff
const getStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.send(staff);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Get a single staff
const getStaffByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const staff = await Staff.findOne({email});
        if (!staff) {
            return res.status(404).send({ message: 'Staff not found' });
        }
        res.send(staff);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

// Update a staff

const updateStaff = async (req, res) => {
    const email = req.params.email;
    try {
        const staff = await Staff.findOneAndUpdate({email}, req.body, { new: true, runValidators: true });
        if (!staff) {
            return res.status(404).send({ message: 'Staff not found' });
        }
        res.send(staff);
    }
    catch (error) {
        res.status(400).send
    }
}

// Delete a staff
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findOneAndDelete(req.params.email);
        if (!staff) {
            return res.status(404).send({ message: 'Staff not found' });
        }
        res.send({message: 'Staff deleted successfully', staff});
    } catch (error) {
        res.status(500).send(error);
    }
}

export { createStaff, getStaff, getStaffByEmail, updateStaff, deleteStaff };