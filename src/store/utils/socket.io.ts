import io, { Socket } from "socket.io-client"
// import { fetchMessages } from "store/actions/message"

var socket: Socket
// socket io client
const ENDPOINT = "localhost:8300"
socket = io(ENDPOINT, { transports: ['websocket'] })

socket.connect()