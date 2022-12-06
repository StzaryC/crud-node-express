const express = require("express")
const mysql = require("mysql")

const app = express();
const port = 3000

app.listen(port || 0, ()=>{
    console.log("api works server listenning at localhost: " + port);
})

const connection = mysql.createConnection({
    host: "localhost",
    database: "node",
    user: "root",
    password: "",
})
connection.connect((err)=>{
    if(err){
        throw err
    } else {
        console.log("DB Connected");
    }
})
app.get('/api', (req, res) => {
    connection.query("SELECT * FROM users" , (err, rows)=>{
        console.log(rows)
        res.send(rows)
    })
})
app.post('/api', (req, res )=>{
    connection.query("INSERT INTO users (id, Name) values (null, 'Prueba ')"),(err, rows)=>{
        res.send(rows)
    }
})
app.patch('/api/:id', (req, res)=>{
    connection.query(`UPDATE users SET Name = 'Prueba patching 5' WHERE users.id = ${req.params.id}`, (err, rows)=>{
        res.send(
            req.params.id,
            rows
        )
    })
})
app.delete('/api/:id', (req, res)=>{
    connection.query(`DELETE FROM users WHERE users.id = ${req.params.id}`, (err, rows)=>{
        res.send(
            
            rows
        )
    })
})

app.get("/index.html", (req, res)=>{
    app.use(express.static(__filename + 'index.html'))
    
})


   




