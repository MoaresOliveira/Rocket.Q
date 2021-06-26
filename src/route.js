const express = require("express");
const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController");
const ErrorController = require("./controllers/ErrorController")

const route = express.Router();

route.get("/", (req, res) => res.render("index", { page: "enter-room" }));
route.get("/create-pass", (req, res) =>
    res.render("index", { page: "create-pass" })
);

route.post("/create-room", RoomController.create);
route.get("/room/:room", RoomController.open);
route.post("/enterroom", RoomController.enter);
// Sala não encontrada
route.get("/room-not-found/:room", ErrorController.notFound);
// Senha incorreta
route.get("/wrong-password/:room", ErrorController.wrongPass);

route.post("/question/create/:room", QuestionController.create);
route.post("/question/:room/:question/:action", QuestionController.index);

module.exports = route;
