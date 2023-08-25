const express = require('express');
const mongoDB = require('./db');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type ,Accept"
  )
  next();
})
app.use(express.json()); 

mongoDB().then(() => {
  app.use("/", require('./Routes/CreateUser'));

  app.get('/', (req, res) => {
    res.send("hello");
  });




  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
