const express = require('express');
const cors = require('cors');
const websocket = require('ws');
const app = express();
const PORT = 3000;
const pg = require('pg');

app.use(cors());
app.use(express.json())

const wss = new websocket.Server({ port: 8080 });

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'gambit',
  password: 'password',
  port: 5432,
});

app.get('/', async (req, res) => {
  await client.connect();
  const result = await client.query('SELECT * FROM messages');
  res.send(result.rows);
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
  
  ws.send(JSON.stringify({type: 'message', data: {message: 'Welcome to the WebSocket server!', chat:'Chat 1'}}));

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    
    if(parsedMessage.type === 'message') {
        console.log(`Received: ${parsedMessage.data}`);
        wss.clients.forEach((client) => client.send(JSON.stringify({type: 'message', data: { message:`${parsedMessage.user}: ${parsedMessage.data.message}`, chat: `${parsedMessage.data.chat}`}, user:`${parsedMessage.user}`})))
        return;
    }
    if(parsedMessage.type === 'chat') {
      const chat = [{user: 'server', text: `Welcome to chat ${parsedMessage.data}`}];
      ws.send(JSON.stringify({type: 'chat', data: chat}));
        return;
    }
  });

  wss.on('close', () => {
    console.log('Client disconnected');
  });
}); 