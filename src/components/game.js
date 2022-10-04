const PlayArea = require('./playArea');

class Game {
	startGame({width, height, minesCount}) {
		this.playArea = new PlayArea({width, height, minesCount});
	}
}

module.exports = Game;
