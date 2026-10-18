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

client.connect();

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

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    
    if(parsedMessage.type === 'message') {
        console.log(`Received: ${parsedMessage.data}`);
        wss.clients.forEach((client) => client.send(JSON.stringify({type: 'message', data: { message:`${parsedMessage.user}: ${parsedMessage.data.message}`, chat: `${parsedMessage.data.chat}`}, user:`${parsedMessage.user}`})))
        return;
    }
    if(parsedMessage.type === 'chat') {
        let result = '';
        switch(parsedMessage.data) {
            case 'Chat 2':
                result = await client.query("SELECT * FROM messages where chat_id = '101f58a4-3087-4533-93dc-656089109a6b'");
                break;
            case 'Chat 3':
                result = await client.query("SELECT * FROM messages where chat_id = 'd14e93fc-3693-408d-96e8-89cb9d94146c'");
                break;
            case 'Chat 4':
                result = await client.query("SELECT * FROM messages where chat_id = 'dad4028a-4745-4af1-9941-fcf2f9401de2'");
                break;
            default:
                break;
        }
        const messages = result.rows
        const chat = []
        messages.forEach(message => {
          chat.push({user: `${message.user_id}`, text: `${message.user_id}: ${message.message}`})
        });
        ws.send(JSON.stringify({type: 'chat', data: chat}));
        return;
    }
  });

  wss.on('close', () => {
    console.log('Client disconnected');
  });
}); 