import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import session from "express-session";
import { Server } from "socket.io";
import cors from "cors";

//imports propios
import sessionOptions from "./config/session.js";
import router from "./routes/router.js";
import passport from "passport";
import passportConfig from "./config/passport.js";

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

//Permitir el acceso de socket.io en cualquier controlador
app.use(function (req, res, next) {
  try {
    req.io = io;
    next();
  } catch (error) {
    throw new Error("Error al definir req.io");
  }
});

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(session(sessionOptions));
//configuracion de passport
app.use(passport.initialize());
app.use(passport.session());

// estrategias y serializadores
passportConfig(passport);

//rutas
app.use(router);

export default http;
