

// PUSH MODEL (eg Push Notification almost instantaneously)


const http = require("http")
const webSocketServer = require("websocket").server
let connections = []; //handling all the active connections

//creating a raw http server  ( making this for creating TCP connection which will then pass to do 
//the push on all the active(online) connections)
const httpServer = http.createServer()


//passing the httpServer object to websocketServer libarary to do all the things

//websocket acts as a bi-directional protocol by using TCP underneath it 
//websocket handshaking..
const webSocket = new webSocketServer({'httpServer':httpServer})

httpServer.listen(8060, ()=> {
    console.log('Server Running on Port 8060')
})

webSocket.on('request',request => {

    const connection = request.accept(null,request.origin)
    console.log(connection)

    connection.on('message',message => {
        //any of the user sent message , tell every connection
        connections.forEach (c=>c.send(`User${connection.socket.remotePort} says: ${message.utf8Data}`))//remoteAddress
        });

        connections.push(connection)

        connections.forEach(c=>c.send(`User${connection.socket.remotePort} just connected`))
    })
// })


// client code
//let ws = new WebSocket("ws://localhost:8080")
//ws.onmessage = message => console.log(`Recieved: ${message.data}`);
//ws.send('Hello im the client)




