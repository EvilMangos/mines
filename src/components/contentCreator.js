const {createArrayWithRandomNumbers, getAdditions} = require('../utils/utils');

class contentCreator {
	fillFieldByContent(field) {
		field.updateField(this.initField(field));
		field.updateField(this.getFieldWithMines(field));
		field.updateField(this.fillFieldByNumbers(field));
	}

	initField(field) {
		return field.getField().map(
			row => row.map(() => ({isMine: false, value: 0})),
		);
	}

	getFieldWithMines(field) {
		const cellsRowWithMines = this.getMinesPositionsInRow(field);
		return this.formatRowAsField(cellsRowWithMines, field);
	}

	getMinesPositionsInRow(field) {
		const fieldCellsCount = field.getWidth() * field.getHeight();
		const fieldCellsInRow = createArrayWithRandomNumbers(fieldCellsCount);

		const sortedFieldCellsRow = new Array(...fieldCellsInRow).sort((a, b) => b - a);
		const mines = sortedFieldCellsRow.slice(0, field.getMinesCount());
		return fieldCellsInRow.map(value => mines.includes(value));
	}

	formatRowAsField(rowWithMines, field) {
		const fieldWithMines = [];
		const clonedField = field.getField();

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

	fillFieldByNumbers(field) {
		const clonedField = field.getField();

		for (let i = 0; i < field.getHeight(); i++) {
			for (let j = 0; j < field.getWidth(); j++) {
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
				this.isCoordinatesInRange({field, row: newRow, column: newColumn})
			) {
				if (!field[newRow][newColumn].isMine) {
					field[newRow][newColumn].value++;
				}
			}
		});
	}

	isCoordinatesInRange({field, row, column}) {
		const fieldWidthLimit = field.length;
		const fieldHeightLimit = field[0].length;
		return row >= 0 && row < fieldWidthLimit && column >= 0 && column < fieldHeightLimit;
	}
}

module.exports = contentCreator;
