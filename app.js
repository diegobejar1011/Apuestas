require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const createConnection = require("./src/config/db.config");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
  pingInterval: 1000,
  pingTimeout: 2000,
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const indexRouter = require ('./src/routes/index.routes');

app.use('/api', indexRouter);


const authMiddleware = require('./src/middlewares/socketio/auth.middleware');
io.use(authMiddleware.verifyJWT)


const indexHanlder = require("./src/handlers/index.handler");

const onConnection = (socket) => {
  console.log('Cliente conectado');
  socket.join(socket.handshake.auth.idUsuario);
  indexHanlder.equipoHandler(io, socket);
  indexHanlder.partidoHandler(io, socket);
  indexHanlder.detalleHandler(io, socket);
  indexHanlder.apuestaHandler(io, socket);
  indexHanlder.opcionHandler(io, socket);
  indexHanlder.usuarioHandler(io, socket);
};

io.on("connection", onConnection);

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`${process.env.NAME_APPLICATION} online`)
});