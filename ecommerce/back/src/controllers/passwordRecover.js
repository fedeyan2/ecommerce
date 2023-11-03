import { validationResult } from "express-validator";

//mis imports
import expressValidatorErrors from "../utils/expressValidatorErrors.js";
import User from "../models/User.js";
import responses from "../utils/responses.js";
import transporter from "../config/nodemailer.js";

export default async function recoverPassword(req, res) {
  try {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorData = expressValidatorErrors(errors.array());
      return res.status(400).json(errorData);
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json(responses("El usuario no existe.", false));
    }

    const mailOptions = {
      from: "developer.basilorien@gmail.com",
      to: email,
      subject: "Ecommerce | recuperar contraseña.",
      text: ``,
    };
  } catch (error) {
    console.error("Error en recoverPassword");
    throw new Error(error);
  }
}

function generateCode() {
  const code = Math.floor(Math.random() * 900000) + 100000;
  return code;
}
