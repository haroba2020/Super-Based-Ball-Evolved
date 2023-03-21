const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/route')
const loginRoutes = require('./routes/login')

const PORT = process.env.PORT || 3001;



const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  const dbURI = 'mongodb+srv://CyberBoarBot:testpass@superbasedballdb.sdfo5br.mongodb.net/SBBE?retryWrites=true&w=majority'
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err)=> console.log(err))

  app.use(routes);
  app.use(loginRoutes);
