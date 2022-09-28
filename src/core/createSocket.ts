import { Server } from "socket.io";
import ISockets from "../interfaces";

const createSocket = (http: any) => {
  const io = new Server<ISockets.ClientToServer, ISockets.ServerToClient>(
    http,
    {
      cors: {
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"],
      },
    }
  );

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
  });

  return io;
};

export default createSocket;

//
