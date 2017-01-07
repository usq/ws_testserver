var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8080 });

var connectedChannels = []
wss.on('connection', function connection(ws) {
    console.log("connection established")
    connectedChannels.push(ws)

    console.log(connectedChannels.length)

    ws.on('close', function close() {
	console.log('disconnected');
	connectedChannels.splice(connectedChannels.indexOf(ws), 1)
    });
    
    ws.on('message', function incoming(message) {
	message = JSON.parse(message)
	
	console.log("")
	console.log(message)
	console.log("")

	var resp =  message.data.clientid + ": " + message.data.textresponse
	for (var i = 0; i < connectedChannels.length; i++) {
	    send(connectedChannels[i], resp)
	}

    });
    var id = Math.round((Math.random() * 1000))
    send(ws, id, "idmsg")
});



function send(ws, message, type="msg") {
    var msg = {'type':type, "content": message}
    var m = JSON.stringify(msg)
    ws.send(m);
}









