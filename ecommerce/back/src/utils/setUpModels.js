import User from "../models/User.js";

export default async function setUpModels() {
  const forceUser = true;
  const alterUser = true;

  await User.sync({ force: forceUser, alter: alterUser });
}
