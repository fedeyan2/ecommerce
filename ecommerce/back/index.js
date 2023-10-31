import { config } from "dotenv";
import http from "./src/app.js";
import sequelize from "./src/config/database.js";
import setUpModels from "./src/utils/setUpModels.js";

//imports propios

//configuracion de dotenv

config({ path: "./.env" });

//variables del servidor
const currentDomain = "http://192.168.1.54";

//iniciar servidor
sequelize.authenticate().then(async () => {
  // configurar sequelize

  await sequelize.sync();
  console.log("Sequelize configurado");

  await setUpModels();
  console.log("Modelos sincronizados")

  http.listen(process.env.PORT || 3002, () =>
    console.log(
      `Server running on ${currentDomain}:${process.env.PORT || 3002}`
    )
  );
});
