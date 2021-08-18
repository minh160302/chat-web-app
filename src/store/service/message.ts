// import io from "socket.io-client";

// const socket = io("localhost:8300")
// console.log(socket)


export const sendMessageService = (payload) => {
  try {
    // ws.send(JSON.stringify(payload))
    // console.log("service message", payload)
    return payload
  } catch (error) {
    console.log(error)
  }
  // return payload;
};
