var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.listen(3000, () => {
    console.log("Example is running on port 3000");
});

function matrixGeneration(matrixSize, grassCount, grassEaterCount, predatorCount, bombCount, piranhaFlowerCount) {
    let matrix = []
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }

    }

    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1

        }

    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2

        }

    }

    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3

        }

    }

    for (let i = 0; i < bombCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4

        }

    }
    for (let i = 0; i < piranhaFlowerCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5

        }

    }
    return matrix
}


let matrix = matrixGeneration(40, 60, 20, 5, 10, 10)


io.sockets.emit("emit matrix", matrix)

// charactor Arrays

 grassArr = [];
 grassEaterArr = [];
 predatorArr = [];
 bombArr = [];
 piranhaFlowerArr = [];


//  modules

let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")
let Bomb = require("./bomb")
let PiranhaFlower = require("./piranhaFlower")
