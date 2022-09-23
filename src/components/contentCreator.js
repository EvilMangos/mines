const {createArrayWithRandomNumbers} = require('../utils/randomGenerator');

class contentCreator {
	fillFieldByContent(field) {
		field.updateField(this.getFieldWithMines(field));
	}

	getFieldWithMines(field) {
		const filedCellsRowWithMines = this.getMinesPositionsInRow(field);
		return this.formatRowAsField(filedCellsRowWithMines, field);
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
			fieldWithMines[row] = clonedField.map(() => {
				const cell = {
					isMine: rowWithMines[i],
					value: null,
				};
				i++;
				return cell;
			});
		}

		return fieldWithMines;
	}
}

module.exports = contentCreator;