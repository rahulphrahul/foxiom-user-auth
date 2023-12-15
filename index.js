const express=require('express');
const userRoutes = require('./routes/userRoutes');
const dbConnect = require("./config/dbConnect");
const app=express()
const dotenv=require('dotenv').config();
const PORT=process.env.PORT || 8888;
dbConnect();

app.use(express.json());
app.use('/api/user', userRoutes);


app.listen (PORT, ()=>{ 
    console.log("Server is listening");
})


