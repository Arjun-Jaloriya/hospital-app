const express = require("express");
const app = express();
const cors  = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const PORT = 4040 || process.env.PORT;
require("./Config/db")
dotenv.config();


const AuthRouter = require(".//Routes/AuthRoutes");

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));


app.use("/api/auth/",AuthRouter);

app.listen(PORT,()=>{
    console.log(`app is live at PORT ${PORT}`);
})