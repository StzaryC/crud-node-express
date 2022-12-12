const express = require("express")
const mysql = require("mysql")

const app = express();
const port = process.env.MYSQLPORT || 6217

app.listen(port, ()=>{
    console.log("api works server listenning at localhost: " + port);
})

const connection = mysql.createConnection({
    host: "containers-us-west-160.railway.app",
    database: "railway",
    user: "root",
    password: "paFNtJaYyN2ZjWh9ZIP4",
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




   




