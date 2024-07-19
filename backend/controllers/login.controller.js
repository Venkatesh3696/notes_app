import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.send({ success: false, message: "Please enter all fields" });
    const dbUser = await User.findOne({ email });
    if (!dbUser) res.send({ success: false, message: "Please Register First" });
    const matchPassword = await bcrypt.compare(password, dbUser.password);

    if (!matchPassword) {
      return res.status(401).json({ eror: "Password doesnt match" });
    }

    const token = jwt.sign(
      { userId: dbUser._id, email: dbUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .send({ message: "Login successful", token, userId: dbUser._id });
  } catch (error) {
    console.log(error);
  }
};
