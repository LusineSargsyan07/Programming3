let LivingCreature = require("./LivingCraeture")
module.exports = class PiranhaFlower extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 35;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
  
    eat() {
        let foods = this.chooseCell(4)
        let food = foods(Math.floor(Math.random()+ foods.length))

        if (food) {
            this.energy++
            let newX = food[0]
            let newY = food[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (let i in bombArr) {
                if (newX == bombArr[i].x && newY == bombArr[i].y) {
                    bombArr.splice(i, 1)

                    break;
                }
            }

            this.x = newX
            this.y = newY
            // if (this.energy >= 27) {
            //     this.move()
            // }

        } else {
            this.move()
        }

    }
    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells(Math.floor(Math.random()+ emptyCells.length))

        if (newCell) {
            this.energy--
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.energy <= 0) {
                this.die()
            }
        }

    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in piranhaFlowerArr) {
            if (this.x == piranhaFlowerArr[i].x && this.y == piranhaFlowerArr[i].y) {
                piranhaFlowerArr.splice(i, 1);
                break;
            }
        }
    }
}