const PlayArea = require('./playArea');

class Game {
	startGame({width, height, minesCount}) {
		this.playArea = new PlayArea({width, height, minesCount});
		return this.playArea.getField();
	}

	doMove({row, column}) {
		const cell = this.playArea.getCell({row, column});
		if (cell.isMine) {
			return {
				message: 'looser',
			};
		}

		this.playArea.openArea({row, column});
		return this.playArea.getField();
	}
}

module.exports = Game;
