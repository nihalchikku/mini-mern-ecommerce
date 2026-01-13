const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:
    true
}));
app.use("/products",productRoutes);


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB Connected"))
    .catch((err)=>console.log("err"));

app.get("/",(req,res)=>{
    res.send("API is running...");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});