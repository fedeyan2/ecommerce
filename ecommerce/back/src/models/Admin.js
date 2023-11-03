import { Model } from "sequelize";
import sequelize from "../config/database.js";

class Admins extends Model {}

Admins.init({}, { sequelize });

export default Admins;
