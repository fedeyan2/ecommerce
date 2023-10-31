import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

//mis imports

import expressValidatorErrors from "../../../utils/expressValidatorErrors.js";
import User from "../../../models/User.js";
import responses from "../../../utils/responses.js";

export async function register(req, res, next) {
  try {
    //comprobar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const parsedErrors = expressValidatorErrors(errors.array());
      return res.status(400).json(parsedErrors);
    }

    //asegurarse de que la informacion es correcta
    const userData = {
      username: req?.body?.username,
      email: req?.body?.email,
      password: req?.body?.password,
    };

    //registrar al usuario y obtener una respuesta
    const result = await registerUser(userData, next);

    //retornar el resultado
    if (result.statusCode !== 200) {
      return res
        .status(result.statusCode)
        .json(responses(result.message, result.bool));
    }
    req.session.fromRegister = true
    return res.redirect(307, "/auth/login");
  } catch (error) {
    next(error);
  }
}

async function registerUser(userData, next) {
  //esta funcion registra el usuario en la DB
  try {
    const resultData = {
      bool: true,
      message: "Registro exitoso.",
      statusCode: 200,
    };

    //registrar el usuario
    const hash = await bcrypt.hash(userData.password, 10);

    delete userData.password;

    const [user, isNew] = await User.findOrCreate({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
      defaults: {
        ...userData,
        password: hash,
      },
    });

    //enviar una respuesta al usuario

    if (!user) {
      resultData.status = 500;
      resultData.bool = false;
      resultData.message = "Se produjo un error, reintenta";
      console.error("Se produjo un error al obtener 'user' (registerUser)");
    }

    if (!isNew) {
      resultData.statusCode = 409;
      (resultData.bool = false), (resultData.message = "El usuario ya existe.");
    }

    return resultData;
  } catch (error) {
    next(error);
  }
}
