import { config } from "dotenv";
import { Sequelize } from "sequelize";

//traer configuracion de dotenv
config();

//database
const { DATABASE_URL } = process.env;

//definir sequelize
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});


export default sequelize;
