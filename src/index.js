const express = require("express");
const {createServer} = require('http');
const {Server} = require('socket.io');
const app = express();
const httpServer = createServer(app);
// const cors = require("cors");
const rootRouter = require("./routes/rootRoute");

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
const PORT = 8080;

app.use(express.json()); // cho phép BE req.body đọc được mã json
app.use(express.static("."));
// app.use(cors()); // cho phép tất cả FE truy cập vào API của BE

httpServer.listen(PORT, () => {
  console.log("----------------------------------------------");
  console.log(`The app is running on http://localhost:${PORT}`);
  console.log("----------------------------------------------");
});

app.use("/api", rootRouter);

// ---------------------------------------------------

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("join-room", (roomId) => {
    socket.rooms.forEach((room) => socket.leave(room));
    socket.join(roomId);
  });

  socket.on("image-create", (data) => {
    io.emit("notify-image-create", data);
  });

  let roomID = 1;
  socket.on("submit-comment", (data) => {
    io.to(roomID).emit("notify-post-comment", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id + reason);
  });
});

// ---------------------------------------------------

const { graphqlHTTP } = require("express-graphql");
const schemaGrap = require("./graphql/schema");
const resolverGrap = require("./graphql/resolver");

app.use(
  "/grap",
  graphqlHTTP({
    schema: schemaGrap, // nơi để định nghĩa các model bất kỳ để chứa data
    rootValue: resolverGrap, // nơi định nghĩa các hàm xử lý data
    graphiql: true, // cho phép client truy cập vào giao diện thao tác của graphql
  })
);

// ---------------------------------------------------

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    info: {
      title: "api",
      version: "1.0.0",
      description: "No more time to do this feature"
    },
  },
  apis: ["src/swagger/index.js"],
};
const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));

