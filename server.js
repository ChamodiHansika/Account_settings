const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const profileRouter=require("./routes/profiles");
const router = express.Router();
const User = require('./models/Profile');


const app = express();
const PORT = process.env.PORT || 4080;

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connections success!");
});


app.use("/profile",profileRouter)


app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});


router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send(error);
  }
});


module.exports = app;
