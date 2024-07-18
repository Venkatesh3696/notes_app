import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.send({ success: false, message: "Please enter all fields" });
    const dbUser = await User.findOne({ email });
    if (!dbUser) res.send({ success: false, message: "Please Register First" });

    if (dbUser.password !== password)
      res.send({ success: false, message: "Please enter correct password" });
    res.status(200).send({ message: "Login successful", user: dbUser });
  } catch (error) {
    console.log(error);
  }
};
