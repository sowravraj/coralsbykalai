const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")


const app = express.json()

const PORT = 3000




app.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`);
})