import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static(__dirname + "/../public"));

const server = http.createServer(app);
const io = new Server(server);

const clients: Array<any> = [];

io.on("connection", (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);
    clients.push(socket.id);

    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        clients.splice(clients.indexOf(socket), 1);
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta *:3000");
});