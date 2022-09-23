const Game = require('./components/game');

const game = new Game();

game.startGame({width: 10, height: 20, minesCount: 40});
