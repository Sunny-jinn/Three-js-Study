import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3001);

const characters = [];

const items = {
  table: {
    name: "Table",
    size: [3, 5],
  },
  chair: {
    name: "Chair",
    size: [2, 2],
  },
  couch: {
    name: "Couch Small",
    size: [3, 2],
  },
  stepCubbyStorage: {
    name: "Step Cubby Storage",
    size: [4, 2],
  },
};

const map = {
  size: [10, 10],
  gridDivision: 2,
  items: [
    {
      ...items.chair,
      gridPosition: [0, 0],
    },
  ],
};

const generateRandomPosition = () => {
  return [Math.random() * map.size[0], 0, Math.random() * map.size[1]];
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
  console.log("user connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    hairColor: generateRandomHexColor(),
    topColor: generateRandomHexColor(),
    bottomColor: generateRandomHexColor(),
  });

  socket.emit("hello", {
    map,
    characters,
    id: socket.id,
    items,
  });

  io.emit("characters", characters);

  socket.on("move", (position) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    character.position = position;
    io.emit("characters", characters);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );

    io.emit("characters", characters);
  });
});
