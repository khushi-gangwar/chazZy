const express=require("express");
const app=express();
const cors=require("cors");
const data=require('./data.js');
const {mongoURL}=require("./keys");
const mongoose= require("mongoose");
const port =process.env.port || 5000;
const path=require("path")
app.use(cors())
require('./models/model')
require('./models/post')
app.use(express.json())           //middleware func
app.use(require('./routes/auth')) //app.use ke through we can run any middleware
app.use(require('./routes/createPost'))
app.use(require('./routes/user.js'))
mongoose.connect(mongoURL)

mongoose.connection.on("connected",()=>{
    console.log("succesfully connected ")
})

// app.get('/',(req,res)=>{
//     res.json(data)
// }) 

//serving the frontend
app.use(express.static(path.join(__dirname,"./client/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})
app.listen(port, function () {
    console.log("Server started on 5000");
});
