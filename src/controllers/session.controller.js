import jwt from "jsonwebtoken";
import SessionServices from "../services/session.services.js";
import config from "../config/config.js";

const sessionServices = new SessionServices();

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await sessionServices.registerUser(user);
    res.status(201).json({
      status: "success",
      payload: `${result.email} registrado exitosamente`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await sessionServices.login(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        userId: user._id,
        last_connection: user.last_connection,
      },
      config.JWT_PRIVATE_KEY,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: "lax",
        maxAge: config.JWT_EXPIRES_IN,
        signed: true,
      })
      .status(200)
      .json({
        token,
        user: {
          email: user.email,
          role: user.role,
          userId: user._id,
          last_connection: user.last_connection,
        },
      });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prod",
    sameSite: "lax",
    maxAge: config.JWT_EXPIRES_IN,
    signed: true,
  });
  res.status(200).json({ message: "Logout exitoso" });
};
