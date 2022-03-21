require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlerMiddleware")

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use("/api", router)
// должен быть в самом конце после подключения к роутам
app.use(errorHandler)

// мы нигде не вызывали next потому что на нем работа прекращается 
// и мы возвращаем ответ на клиент

const start = async () => {
  try {
    const url = process.env.MONGO_URL;
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection

    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
