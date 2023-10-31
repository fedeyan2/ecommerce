import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

//mis imports
import User from "../models/User.js";

export default function passportConfig(passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [{ username }, { email: username }],
          },
        });

        if (!user) {
          return done(null, false, {
            message: "El usuario no existe.",
            code: 404,
          });
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false, {
              message: "Contraseña incorrecta",
              code: 401,
            });
          }

          return done(null, { id: user.id }, { message: "Iniciaste sesión", code: 200 });
        });
      } catch (error) {
        done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  console.log("Passport configurado");
}
