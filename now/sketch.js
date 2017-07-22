

class Grid{
	constructor(width, height, rows, columns){
		this.width   = width;
		this.height  = height;
		this.rows    = rows;
		this.columns = columns;

		this.rowSize = height / rows;

		this.columnSize = width/columns; 
	}

	draw(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; ++j){
				fill(random(0,255),random(0,255),random(0,255), 255);
				rect(i * this.rowSize, j * this.columnSize, this.rowSize, this.columnSize);
			}
		}
	}
}

var grid;

function setup(){
	createCanvas(600, 600);
	grid = new Grid(600,600,60,60);
	grid.draw();
}

function draw() {
  //grid.draw()
}