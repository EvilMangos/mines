const outFieldForDev = field => {
	field.forEach(row => {
		console.log(row.map(value => value.isMine ? 9 : value.value));
	});

	console.log('----------------------------------');

	field.forEach(row => {
		console.log(row.map(value => value.isOpen ? 1 : 0));
	});
};

module.exports = {
	outFieldForDev,
};
