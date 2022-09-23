const {createArrayWithRandomNumbers} = require('../utils/randomGenerator');

class contentCreator {
	fillFieldByContent(field) {
		field.updateField(this.fillFieldByMines(field));
	}

	fillFieldByMines(field) {
		return this.getFieldWithMinesPositions(field);
	}

	getFieldWithMinesPositions(field) {
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
			let count = 0, i = 0;
			count < rowWithMines.length;
			i++
		) {
			fieldWithMines[i] = clonedField.map(() => {
				const cell = {
					isMine: rowWithMines[count],
					value: null,
				};
				count++;
				return cell;
			});
		}

		return fieldWithMines;
	}
}

module.exports = contentCreator;
