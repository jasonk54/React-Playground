var MakeMazeArr = function(x, y) {
    this.height = x;
    this.width = y;
    this.totalCells = this.height * this.width;
    this.cells = [];
    this.unvisited = [];
    this.currentCell = [0, 0];
    this.visited = 1;
    this.path = [this.currentCell];

    this.createGridArray(this.height, this.width);
    this.cells = this.createMazeArr(this.height, this.width);
};

MakeMazeArr.prototype = {
    // Create the initial grid array
    createGridArray: function(y, x) {
        for (var column = 0; column < y; column++) {
            this.cells[column] = [];
            this.unvisited[column] = [];

            for (var row = 0; row < x; row++) {
                this.cells[column][row] = [0, 0, 0, 0];
                this.unvisited[column][row] = true;
            }
        }

        this.unvisited[this.currentCell[0]][this.currentCell[1]] = false;
    },

    // Create maze cells array
    createMazeArr: function(y, x) {

        while (this.visited < this.totalCells) {

            var surroundingCells = [],
                next,
                check = [
                    [this.currentCell[0] - 1, this.currentCell[1], 0, 2],
                    [this.currentCell[0], this.currentCell[1] + 1, 1, 3],
                    [this.currentCell[0] + 1, this.currentCell[1], 2, 0],
                    [this.currentCell[0], this.currentCell[1] - 1, 3, 1]
                ];


            for (var l = 0; l < 4; l++) {

                if (check[l][0] > -1 && check[l][0] < y && check[l][1] > -1 && check[l][1] < x && this.unvisited[check[l][0]][check[l][1]]) {
                    surroundingCells.push(check[l]);
                }
            }

            if (surroundingCells.length) {
                next = surroundingCells[Math.floor(Math.random() * surroundingCells.length)];

                this.cells[this.currentCell[0]][this.currentCell[1]][next[2]] = 1;
                this.cells[next[0]][next[1]][next[3]] = 1;

                this.unvisited[next[0]][next[1]] = false;
                this.visited++;

                this.currentCell = [next[0], next[1]];
                this.path.push(this.currentCell);
            } else {
                this.currentCell = this.path.pop();
            }
        }
        return this.cells;
    }

};