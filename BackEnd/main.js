const express = require('express');
const cors = require('cors');
const websocket = require('ws');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())

const wss = new websocket.Server({ port: 8080 });

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/test', async (req, res) => {
    console.log("The count from React is: " + req.body.count);
    res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.send(JSON.stringify({type: 'message', data: 'Welcome to the WebSocket server!'}));

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    
    if(parsedMessage.type === 'message') {
        console.log(`Received: ${parsedMessage.data}`);
        ws.send(JSON.stringify({type: 'message', data: `Server received your message: ${parsedMessage.data}`}));
        return;
    }
    if(parsedMessage.type === 'chat') {
      const chat = [{user: 'server', text: 'Welcome to the chat!'},{user: 'me', text: 'Cheers mate!'}];
      ws.send(JSON.stringify({type: 'chat', data: chat}));
        return;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
}); 