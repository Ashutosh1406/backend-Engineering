/*
Client Code 

let sse = new EventSource('http://localhost:8880/stream');
sse.onmessage = console.log();

*/



const app = require('express')();

app.get('/' , (req,res) => res.send('hello from sse server'))

app.get('/stream' , (req,res) => {
    res.setHeader('Content-Type',"text/event-stream");
    sendResponse(res)
})

const PORT = 8880;

// app.listen(8888 , () => {
//     console.log('Listening on PORT 8880')
// })

let i=0;

function sendResponse(res) {
    res.write("data:" + `hello from server----- ${i++}\n\n`);   // start with data and end with \n\n marks the end of streaming response body

    setTimeout( () => sendResponse(res),1000)              //200 streams allowed per 1 http 1.1 connection on a domain
}

app.listen(PORT)

console.log(`Listening on Port ${PORT}`)





