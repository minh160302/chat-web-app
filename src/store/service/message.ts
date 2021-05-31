// const ws = new WebSocket("ws://localhost:8762/message-service/socket");
const ws = new WebSocket("ws://localhost:8100/socket");

ws.onopen = () => {
  ws.send("send from client");
  console.log("ws opened");
};
// ws.current.onclose = () => console.log("ws closed");

ws.onmessage = (event) => {
  console.log("Receive from socket server")
  console.log(event.data);
}

ws.onerror = (error) => {
  console.log(error)
};

ws.onclose = (CloseEvent) => {
  console.log(CloseEvent.reason)
  console.log(CloseEvent.code)
}

export const sendMessageService = (payload) => {
  try {
    ws.send(JSON.stringify(payload))
    return payload
  } catch (error) {
    console.log(error)
  }
  // return payload;
};
