import { config } from "dotenv";
import Admins from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
//trayendo doetnv
config();

export default async function setUpModels() {
  //forzar/alterar tablas.

  const forceUser = true;
  const alterUser = true;

  const alterAdmins = true;
  const forceAdmins = true;

  //relaciones

  User.belongsTo(Admins);
  Admins.hasMany(User);

  //sincronizar modelosa
  await User.sync({ force: forceUser, alter: alterUser });
  await Admins.sync({ force: forceAdmins, alter: alterAdmins });
  console.log("Todos los modelos sincronizados.");

  //creacion de tablas necesarias para el servidor

  const admins = await Admins.create();

  //admin}

  await registerAdmin(admins);

  console.log("Todas las operaciones de sequelize realizadas con exito.");
}

async function registerAdmin(Admins) {
  const { USER_NAME, EMAIL } = process.env;

  const random = Math.floor(Math.random() * 900000) + 100000;

  const hash = await bcrypt.hash(random.toString(), 10);

  const [admin, _] = await User.findOrCreate({
    where: {
      email: EMAIL,
      username: USER_NAME,
    },
    defaults: {
      email: EMAIL,
      username: USER_NAME,
      password: hash,
    },
  });

  await Admins.addUser(admin);

  try {
  } catch (error) {
    console.error(error);
    throw new Error(`Se produjo un error al registrar el administrador`);
  }
}
