import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password)
      res.send({ success: false, message: "All fields required" });
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser)
      res.send({ success: false, message: "email already exists" });
    const user = new User({
      email,
      password,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .send({ success: true, message: "new user created!", user: savedUser });
  } catch (error) {
    console.log(error);
  }
};
