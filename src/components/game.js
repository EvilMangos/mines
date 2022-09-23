const Field = require('./field');

class Game {
	startGame({width, height, minesCount}) {
		this.field = new Field({width, height, minesCount});
	}
}

module.exports = Game;
