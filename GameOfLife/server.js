var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
const { kill } = require('process');

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, () => {
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
matrix = matrixGeneration(30, 60, 20, 5, 10, 10)

io.sockets.emit("send matrix", matrix)

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
piranhaFlowerArr = [];

let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")
let Bomb = require("./bomb")
let PiranhaFlower = require("./piranhaFlower");

function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (matrix[y][x] == 2) {

                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)

            } else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)

            } else if (matrix[y][x] == 4) {

                let bomb = new Bomb(x, y)
                bombArr.push(bomb)

            } else if (matrix[y][x] == 5) {

                let piranhaFlower = new PiranhaFlower(x, y)
                predatorArr.push(piranhaFlower)

            }
        }

    }

    io.sockets.emit("send matrix", matrix)

}

function game() {


    for (let i in grassArr) {
        if (grassArr.length == 0) {
            break
        }
        grassArr[i].mull()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in bombArr) {
        bombArr[i].boom()
        bombArr[i].move()
    }
    for (let i in piranhaFlowerArr) {
        piranhaFlowerArr[i].eat()
    }

    io.sockets.emit("send matrix", matrix)

}

setInterval(game, 300)

var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit("Winter", weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit("Summer", weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit("Spring", weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit("Autumn", weath);
}

function Kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    bombArr = [];
    piranhaFlowerArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddGrass() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            let grass = new Grass(x, y)
            grassArr.push(grass)
        }

    }
    io.sockets.emit("send matrix", matrix)
}

function AddGrassEater() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            let grassEater = new GrassEater(x, y)
            grassEaterArr.push(grassEater)
        }

    }
    io.sockets.emit("send matrix", matrix)
}


function AddBomb() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            let bomb = new Bomb(x, y)
            bombArr.push(bomb)
        }

    }
    io.sockets.emit("send matrix", matrix)
}

function AddPiranhaFlower() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            let piranhaFlower = new PiranhaFlower(x, y)
            piranhaFlowerArr.push(piranhaFlower)
        }

    }
    io.sockets.emit("send matrix", matrix)
}

function AddPredator() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            let predator = new Predator(x, y)
            predatorArr.push(predator)
        }

    }
    io.sockets.emit("send matrix", matrix)
}

var statistics = {
}
setInterval(function () {

    statistics.grass = grassArr.length
    statistics.GrassEater = grassEaterArr.length
    statistics.piranhaFlower = piranhaFlowerArr.length
    statistics.predator = predatorArr.length
    statistics.grass = grassArr.length
    statistics.bomb = bombArr.length

    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        console.log("game of life statistics")
    })
}, 1000)

io.on("connection", function (socket) {
    createObject(matrix)

    socket.on("spring", Spring);
    socket.on("summer", Summer);
    socket.on("autumn", Autumn);
    socket.on("winter", Winter);
    socket.on("addGrass", AddGrass);
    socket.on("addGrassEAter", AddGrassEater);
    socket.on("killAll", Kill);
    socket.on("addBomb", AddBomb);
    socket.on("addPiranhaFlower", AddPiranhaFlower);
    socket.on("addPredator", AddPredator);
})