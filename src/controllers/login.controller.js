import staff from '../models/staff.model.js';
import user from '../models/user.model.js';
import jwt from 'jsonwebtoken';


//Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let requiredUser = await user.findOne({ email });
    if (!requiredUser) {
      requiredUser = await staff.findOne({ email });
    }
    if (!requiredUser) {
      return res.status(404).send({ message: 'Invalid Email, User not found' });
    }
    //Validate password
    if (password !== requiredUser.password) {
      return res.status(400).send({ message: 'Invalid Password' });
    }
    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

export default login;