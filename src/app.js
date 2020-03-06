const express = require('express')
const app = express()
const envp = require('./envp')

const redis = require("redis");
const client = redis.createClient(envp.PORT, envp.IP);
client.auth(envp.DATABASE_PASSWORD)

app.use(express.json())

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


app.get("/add", (req, res) => {
    client.set(req.query.key, req.query.value, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            return res.send(result)
        }
    });
})

app.get("/get", (req, res) => {
    client.get(req.query.key, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            return res.send(result)
        }
    });
})

app.listen(3008, () => {
    console.log('server running');
})