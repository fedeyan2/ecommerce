import { body } from "express-validator";

export const localRegisterRules = [
  body("username")
    .exists()
    .withMessage("No se detectó el campo 'nombre de usuario'")
    .isString()
    .withMessage("Se esperaban datos de tipo 'Texto'.")
    .isLength({ min: 6 }),
  body("password")
    .exists()
    .withMessage("No se detectó el campo 'contraseña'")
    .isString()
    .withMessage("Se esperaban datos de tipo 'Texto'.")
    .isLength({ min: 6 }),
  body("email")
    .exists()
    .withMessage("No se detecto el campo 'email'")
    .isString()
    .withMessage("Se esperaban datos de tipo 'Texto")
    .isEmail()
    .withMessage("Introduce un email válido"),
];

export const localLoginRules = [
  body("username")
    .exists()
    .withMessage("No se detectó el campo 'nombre de usuario'")
    .isString()
    .withMessage("Se esperaban datos de tipo 'Texto'.")
    .isLength({ min: 6 }),
  body("password")
    .exists()
    .withMessage("No se detectó el campo 'contraseña'")
    .isString()
    .withMessage("Se esperaban datos de tipo 'Texto'.")
    .isLength({ min: 6 }),
];
