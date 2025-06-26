import { io } from "socket.io-client";

class SocketService {
  constructor() {
    const socketUrl = `${window.location.protocol}//${window.location.hostname}:3000`; //TODO port needs to be dynamic as in production mode wont have it
    this.socket = io(socketUrl);
    this.connected = false;
    this.socketId = null;

    this.socket.on("connect", () => {
      console.log("connet");
      this.connected = true;
      this.socketId = this.socket.id;
      console.log("Socket Id :", this.socketId);
      if (this.onConnectCallback) this.onConnectCallback(this.socketId);
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
      if (this.onDisconnectCallback) this.onDisconnectCallback();
    });
  }

  onConnect(callback) {
    this.onConnectCallback = callback;
  }

  onDisconnect(callback) {
    this.onDisconnectCallback = callback;
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, data) {
    console.log("event: ", event, "data:", JSON.stringify(data));
    this.socket.emit(event, data);
  }

  getSocketId() {
    return this.socketId;
  }

  isConnected() {
    return this.connected;
  }
}

const socketService = new SocketService();
export default socketService;
