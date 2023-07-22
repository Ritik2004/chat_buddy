const express = require("express");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes")
const chats =  require('./data/data')
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json()); //to accept user data
app.use(cors());

dotenv.config();
connectDb();
const PORT = process.env.PORT || 5000


app.get('/',(req,res)=>{
    res.send("Api running")
    
})

app.use("/api/user", userRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



app.listen(PORT, console.log(`server running on port ${PORT}`))