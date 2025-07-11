import { io } from "socket.io-client";

class SocketService {
  constructor() {
    // Use SOCKET_URL environment variable, fallback to localhost for development
    const socketUrl = import.meta.env.VITE_SOCKET_URL || `${window.location.protocol}//${window.location.hostname}:3000`;
    
    console.log('SocketService: Connecting to', socketUrl);
    this.socket = io(socketUrl);
    this.connected = false;
    this.socketId = null;

    this.socket.on("connect", () => {
      console.log("SocketService: Connected to server");
      this.connected = true;
      this.socketId = this.socket.id;
      console.log("SocketService: Socket Id :", this.socketId);
      if (this.onConnectCallback) {
        console.log(
          "SocketService: Calling onConnect callback with ID:",
          this.socketId
        );
        this.onConnectCallback(this.socketId);
      } else {
        console.log("SocketService: No onConnect callback registered");
      }
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
      if (this.onDisconnectCallback) this.onDisconnectCallback();
    });
  }

  onConnect(callback) {
    console.log("SocketService: Registering onConnect callback");
    this.onConnectCallback = callback;
    // If already connected, call the callback immediately
    if (this.connected && this.socketId) {
      console.log(
        "SocketService: Already connected, calling callback immediately with ID:",
        this.socketId
      );
      callback(this.socketId);
    }
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
