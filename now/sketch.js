
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

		if (dice < 5){
			return {
				"id":"1",
				"r":255,
				"g":0,
				"b":0,
				"a":255
			};			
		}

		if (dice < 20){
			return {
				"id":"2",
				"r":0,
				"g":0,
				"b":255,
				"a":255
			};			
		}

		return {
			"id":"3",
			"r":0,
			"g":255,
			"b":0,
			"a": 255
		};
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
		console.log("Tick")

		for (let i = 0; i < this.rows; i++){
			for (let j = 0; j < this.columns; ++j){

				var cell = this.cells[i][j];
				var adjacents = this.getAdjacents(cell);

				if (cell.color.id == "1"){
					let foundMeat = false;
					for (let k = 0; k < adjacents.length; ++k){
						if (adjacents[k].color.id == "2"){

							adjacents[k].color = {
								"id":"4",
								"r":0,
								"g":0,
								"b":0,
								"a": 255
							};
							foundMeat = true;
						}
						if (foundMeat) break;
					}

					if (!foundMeat){
						let randomStep = Math.floor(random(0,adjacents.length - 0.01));

						if (adjacents[randomStep].color.id == "4" || 
							adjacents[randomStep].color.id == "1" )
							continue;

						adjacents[randomStep].color = {
							"id":"1",
							"r":255,
							"g":0,
							"b":0,
							"a": 255
						};

						cell.color = {
							"id":"3",
							"r":0,
							"g":255,
							"b":0,
							"a": 255
						}
					}
				}
			}
		}
	}

	getAdjacents(cell){
		let adjacents = [];
		let x = cell.x;
		let y = cell.y;

		if (x >=1){
			adjacents.push(this.cells[x - 1][y])
		}

		if (x < this.cells.length - 1){
			adjacents.push(this.cells[x + 1][y])
		}

		if (y >=1){
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
	createCanvas(600, 600);

	grid = new Grid(600, 600, 60, 60);
	grid.draw();
}

function draw() {
  if (keyIsDown(UP_ARROW)) {
    grid.tick();
    grid.draw();
  }
}