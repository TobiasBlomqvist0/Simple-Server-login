const { json } = require("express");
const express = require("express");
const server = express();
const fs = require("fs");
server.use(express.static("public"))

server.listen(3000, (err) => {
    if(err)console.log(err)
    console.log("connected to webb")
});


server.use(express.static("public"));

server.use(express.urlencoded());

server.get("/form", (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
})

server.post("/signup", (req,res) => {
    let users = []
    let newUser = JSON.parse(fs.readFileSync("writeMe.json", "utf8"))
    users = newUser
    users.push(req.body)
    fs.writeFileSync("writeMe.json", JSON.stringify(users,null,2))


    res.send("Thank you!")
})

server.post("/login", (req,res) => {
    fs.writeFileSync("tryMe.json", JSON.stringify(req.body))

    let users = JSON.parse(fs.readFileSync("writeMe.json", "utf8"))
    let tryingUser = JSON.parse(fs.readFileSync("tryMe.json", "utf8"))
    
    let foundAcc;
    for(let i = 0; i < users.length;i++) {
        
        if(users[i].Email === tryingUser.Email && users[i].Password === tryingUser.Password) {
            res.sendFile(__dirname + "/public/home.html")
            foundAcc = true
        }
        else {
            console.log("next Account")
            if(i === users.length - 1) {
                foundAcc = false
            }
        }
        if(foundAcc === true) {
            console.log("Found your account")
        }
        else if(foundAcc === false) {
            res.send("Wrong password or Email")
        }
    }
})