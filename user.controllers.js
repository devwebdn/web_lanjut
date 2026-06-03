import Users from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tambahuser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      password: hashedPassword,
    });

    res.json(user);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const dataUser = await Users.findAll({
      where: {
        username: username,
      },
    });

    if (dataUser.length === 0) {
      return res.status(404).send("User Tidak Ditemukan");
    }

    const user = dataUser[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).send("Password Salah");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "kasir_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};