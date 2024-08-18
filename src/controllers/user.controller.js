import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Create a new user

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a single user
const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

// Update a user
const updateUser = async (req, res) => {
    const email = req.params.email;
    try {

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findOneAndUpdate({email}, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.email);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).send(error);
    }
}









export { createUser, getUsers, getUserByEmail, updateUser, deleteUser };