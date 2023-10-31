import { validationResult } from "express-validator";
import passport from "passport";

//mis imports
import expressValidatorErrors from "../../../utils/expressValidatorErrors.js";
import responses from "../../../utils/responses.js";

export default function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const parsedErrors = expressValidatorErrors(errors.array());
      return res.status(400).json(parsedErrors);
    }

    passport.authenticate("local", function (error, user, info) {
      if (error) {
        console.error(
          "Se produjo un error en login(local)(passport.authenticate)"
        );
        return next(error);
      }

      if (!user) {
        return res.status(info.code).json(responses(info.message, false));
      }
      req.login(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(info.code).json(responses(info.message, true));
      });
    })(req, res, next);
  } catch (error) {
    console.error("Se produjo un error en login.js (local)");
    next(error);
  }
}
