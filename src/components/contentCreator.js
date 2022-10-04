const {createArrayWithRandomNumbers, getAdditions, isCoordinateInRange} = require('../utils/utils');

class contentCreator {
	constructor(playArea) {
		this.playArea = playArea;
	}

	createContent() {
		this.playArea.updateField(this.initField());
		this.playArea.updateField(this.createMines());
		this.playArea.updateField(this.fillFieldByNumbers());
	}

	initField() {
		return this.playArea.getField().map(
			row => row.map(() => ({isMine: false, value: 0})),
		);
	}

	createMines() {
		const cellsRowWithMines = this.getMinesPositionsInRow();
		return this.formatRowAsField(cellsRowWithMines);
	}

	getMinesPositionsInRow() {
		const fieldCellsCount = this.playArea.getWidth() * this.playArea.getHeight();
		const fieldCellsInRow = createArrayWithRandomNumbers(fieldCellsCount);

		const sortedFieldCellsRow = new Array(...fieldCellsInRow).sort((a, b) => b - a);
		const mines = sortedFieldCellsRow.slice(0, this.playArea.getMinesCount());
		return fieldCellsInRow.map(value => mines.includes(value));
	}

	formatRowAsField(rowWithMines) {
		const fieldWithMines = [];
		const clonedField = this.playArea.getField();

		for (
			let i = 0, row = 0;
			i < rowWithMines.length;
			row++
		) {
			fieldWithMines[row] = clonedField[row].map(clonedCell => {
				clonedCell.isMine = rowWithMines[i];
				i++;
				return clonedCell;
			});
		}

		return fieldWithMines;
	}

	fillFieldByNumbers() {
		const clonedField = this.playArea.getField();

		for (let i = 0; i < this.playArea.getHeight(); i++) {
			for (let j = 0; j < this.playArea.getWidth(); j++) {
				if (clonedField[i][j].isMine) {
					this.increaseCellsAround({field: clonedField, row: i, column: j});
				}
			}
		}

		return clonedField;
	}

	increaseCellsAround({field, row, column}) {
		const additions = getAdditions();
		additions.forEach(addition => {
			const newColumn = column + addition.w;
			const newRow = row + addition.h;

			if (
				isCoordinateInRange({field, row: newRow, column: newColumn})
				&& !field[newRow][newColumn].isMine
			) {
				field[newRow][newColumn].value++;
			}
		});
	}
}

module.exports = contentCreator;
