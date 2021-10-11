import { io } from "socket.io-client"

// socket io client
const ENDPOINT = "localhost:8300"
const socket = io(ENDPOINT);

export default socket;