const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/google_docs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get-document", (documentId) => {
    const data = "";
    socket.join(documentId);

    socket.emit("load-document", data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});
