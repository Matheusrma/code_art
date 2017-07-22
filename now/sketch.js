

var RED = {
	"id":"1",
	"a": 255
};

var BLUE = {
	"id":"2",
	"r":34,
	"g":102,
	"b":102,
	"a": 255
}

var GREEN = {
	"id":"3",
	"r":165,
	"g":198,
	"b":99,
	"a": 255
}

class Cell{

	constructor(x, y, color){
		this.x = x;
		this.y = y;
		this.color = color;
	}

}

class Grid{
	constructor(width, height, rows, columns){
		this.width   = width;
		this.height  = height;
		this.rows    = rows;
		this.columns = columns;

		this.rowSize = height / rows;
		this.columnSize = width/columns; 

		this.cells = []

		for (let i = 0; i < this.rows; i++){
			this.cells.push([])

			for (let j = 0; j < this.columns; ++j){
				var cell = new Cell(i,j,this.getNewColor());

				this.cells[i].push(cell);
			}
		}
	}

	getNewColor(){
		let dice = random(0,100);

		if (dice < 4) return RED;
		if (dice < 20) return BLUE;

		return GREEN;
	}

	draw(){
		for (let i = 0; i < this.rows; i++){
			for (let j = 0; j < this.columns; ++j){
				let color = this.cells[i][j].color;
				fill(color.r, color.g, color.b, color.a);

				rect(i * this.rowSize, j * this.columnSize, this.rowSize, this.columnSize);
			}
		}
	}

	tick(){
		for (let i = 0; i < this.rows; i++){
			for (let j = 0; j < this.columns; ++j){
				var cell = this.cells[i][j];

				if (cell.color.id == RED.id){
					this.fight_back(i,j);
					this.eat(i,j);
				}
				else if (cell.color.id == BLUE.id){
					this.breed(i,j);
				}
			}
		}
	}

	eat(i,j){		
		var cell = this.cells[i][j];
		var adjacents = this.getAdjacents(cell);

		let foundMeat = false;

		for (let k = 0; k < adjacents.length; ++k){
			if (adjacents[k].color.id == BLUE.id){

				adjacents[k].color = GREEN;
				foundMeat = true;
			}
			if (foundMeat) break;
		}

		if (!foundMeat){
			let randomStep = floor(random(0,adjacents.length - 0.01));

			if (adjacents[randomStep].color.id != RED.id){
				adjacents[randomStep].color = RED;
				cell.color = GREEN;
			}
		}
	}

	breed(i,j){
		var cell = this.cells[i][j];
		var adjacents = this.getAdjacents(cell);

		var breed = false;
		let breedChance = random(0,1);
		if (breedChance > 0.10) return;

		for (let k = 0; k < adjacents.length; ++k){
			if (adjacents[k].color.id == BLUE.id){
				let randomStart = floor(random(0,adjacents.length - 0.01));
				for (let l = 0; l < adjacents.length && l != k; ++l){
					let index = (randomStart + l) % adjacents.length;
					if (adjacents[index].color.id == GREEN.id){
						adjacents[index].color = BLUE;
						breed = true;
						break;
					}
				}
			}

			if (breed) break;		
		}
	}

	fight_back(i,j){
		var cell = this.cells[i][j];
		var adjacents = this.getAdjacents(cell);

		let count = 0;

		for (let k = 0; k < adjacents.length; ++k){
			if (adjacents[k].color.id == BLUE.id){
				count++;
			}
		}

		if (count == adjacents.length - 1){
			let killChance = random(0,1);
			if (killChance < 0.1) {
				cell.color = GREEN;
			}
		}
	}

	getAdjacents(cell){
		let adjacents = [];
		let x = cell.x;
		let y = cell.y;

		if (x >= 1){
			adjacents.push(this.cells[x - 1][y])
		}

		if (x < this.cells.length - 1){
			adjacents.push(this.cells[x + 1][y])
		}

		if (y >= 1){
			adjacents.push(this.cells[x][y - 1])
		}
		if (y < this.cells[0].length - 1){
			adjacents.push(this.cells[x][y + 1])
		}

		return adjacents
	}
}

var grid;

function setup(){
	createCanvas(800, 8000);
	frameRate(60)

	stroke(0,0,0,30)

	RED.r = random(180,255);
	RED.g = random(0,60);
	RED.b = random(0,60);

	BLUE.r = random(0,60);
	BLUE.g = random(0,60);
	BLUE.b = random(180,255);

	GREEN.r = random(0,60);
	GREEN.g = random(180,255);
	GREEN.b = random(0,60);

	console.log(RED)
	console.log(BLUE)
	console.log(GREEN)

	grid = new Grid(800, 800, 80, 80);
	grid.draw();
}

function draw() {
  if (!keyIsDown(UP_ARROW)) {
    grid.tick();
    grid.draw();
  }
}