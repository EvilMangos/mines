require('dotenv').config({path: 'configs/local.env'});

const Game = require('./components/game');

const game = new Game();

game.startGame({width: 4, height: 4, minesCount: 4});
