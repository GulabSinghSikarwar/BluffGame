// src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Your server URL

export default socket;
