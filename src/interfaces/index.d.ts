import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

declare namespace ISockets {
  type IServerIO = Server<
    ClientToServer,
    ServerToClient,
    DefaultEventsMap,
    any
  >;

  interface ClientToServer {
    message: (str: string) => void;
  }

  interface ServerToClient {
    test: (str: string) => void;
  }
}

export default ISockets;
