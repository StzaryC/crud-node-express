const express = require("express")
const mysql = require("mysql")

const app = express();
const port = process.env.MYSQLPORT || 6217
const MYSQLHOST = process.env.MYSQLHOST
const MYSQLDATABASE = process.env.MYSQLDATABASE
const MYSQLUSER = process.env.MYSQLUSER
const MYSQLPASSWORD = process.env.MYSQLPASSWORD

app.listen(port, ()=>{
    console.log("api works server listenning at localhost: " + port);
    console.log(MYSQLHOST,MYSQLDATABASE,MYSQLUSER,MYSQLUSER,MYSQLPASSWORD);
    
})

const connection = mysql.createConnection({
    host: MYSQLHOST,
    database: MYSQLDATABASE,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
})
connection.connect((err)=>{
    if(err){
        throw err
    } else {
        console.log("DB Connected");
    }
})
app.get('/', (req, res) => {
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




   




