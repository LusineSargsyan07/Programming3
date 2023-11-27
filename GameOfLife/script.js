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
let side = 25

let grassArr = []
let grassEaterArr = []
let predatorArr = []
let bombArr = []
let piranhaFlowerArr = []

function setup() {
    frameRate(10)
    createCanvas(matrix[0].length * side, matrix.length * side)
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
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {

                fill("green")

            } else if (matrix[y][x] == 2) {

                fill("yellow")

            } else if (matrix[y][x] == 3) {

                fill("red")

            } else if (matrix[y][x] == 4) {
                fill("#8C351F")

            } else if (matrix[y][x] == 5) {
                fill("pink")

            } else {
                fill("gray")

            }
            rect(x * side, y * side, side, side)

        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
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


} 
