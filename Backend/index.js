const connectToMongo = require('./db');
const express = require('express');
connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Helle vikas')
})

app.listen(port, () => {
  console.log(`mynotebook listening at http://localhost:${port}`)
})
