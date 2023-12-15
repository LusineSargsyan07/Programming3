let LivingCreature = require("./LivingCraeture")
module.exports = class Bomb extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.energy = 35;
    this.direction = [];
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
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char1, char2, char3) {
    this.getNewCoordinates();
    let found = [];

    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];

      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == char1) {
          found.push(this.directions[i]);
        }
        if (matrix[y][x] == char2) {
          found.push(this.directions[i]);
        }
        if (matrix[y][x] == char3) {
          found.push(this.directions[i]);
        }

      }
    }

    return found;
  }

  move() {
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random()+ emptyCell.length)]
    if (newCell) {
      this.energy--
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 4;
      matrix[this.y][this.x] = 0

      this.x = newX
      this.y = newY
      if (this.energy <= 0) {
        this.die()
      }
    }
  }

  eat() {
    let emptyCell = this.chooseCell(1, 2, 3);
    let newCell = emptyCell[Math.floor(Math.random()+ emptyCell.length)]

    if (newCell) {
      this.energy++;

      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 4;
      matrix[this.y][this.x] = 0;

      for (let i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      for (let i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      for (let i in predatorArr) {
        if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
          predatorArr.splice(i, 1);
          break;
        }
      }

      this.x = newX;
      this.y = newY;


    }
  }

  boom() {
    let emptyCell = this.chooseCell(2);
    let newCell = emptyCell[Math.floor(Math.random()+ emptyCell.length)]

    if (newCell) {

      this.eat()


    }
  }
  die() {
    matrix[this.y][this.x] = 0;

    for (let i in bombArr) {
      if (this.x == bombArr[i].x && this.y == bombArr) {
        bombArr.splice(i, 1);
        break;
      }
    }
  }
}

