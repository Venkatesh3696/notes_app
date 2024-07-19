import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password)
      res.send({ success: false, message: "All fields required" });
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser)
      res.send({ success: false, message: "email already exists" });
    const hahedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hahedPassword,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .send({ success: true, message: "new user created!", user: savedUser });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "something went wrong" });
  }
};
