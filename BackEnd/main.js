const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())

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