const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const SELECT_ALL_MOVIES_QUERY = 'SELECT * FROM movies;'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'project'
})

connection.connect(err => {
    if(err) {
        return err
    }
});

console.log(connection)

app.use(cors());


app.get('/', (req, res) => {
    res.send('hello /movies')

})


app.get('/movies/add', (req, res) => { 
    const {title, genre, release_date} = req.query;
    console.log(title, genre, release_date)
    const INSERT_MOVIES_QUERY = `INSERT INTO movies (title, genre, release_date) VALUES ('${title}', '${genre}', ${release_date})`
    connection.query(INSERT_MOVIES_QUERY, (err, results) => {
        if(err) {
            return err
        }
        else {
            return res.send('succefully added movie')
        }
    });
});
 
app.get('/movies', (req, res) => {
    connection.query(SELECT_ALL_MOVIES_QUERY, (err, results) => {
        if(err) {
            return err
        }
        else {
            return res.json({
                data: results
            }) 
        }
    })
})


app.listen(5000, () => {
    console.log("This server is running on port 5000")
})


