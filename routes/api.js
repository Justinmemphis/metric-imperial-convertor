'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
	let convertHandler = new ConvertHandler();

	app.route('/api/convert').get((req, res) => {
		let input = req.query.input;
		// console.log('input is: ',input);
		try {
			let invalidNumber = false;
			let invalidUnit = false;

			let initNum = convertHandler.getNum(input);
			let initUnit = convertHandler.getUnit(input);

			if (initNum === null) {
				invalidNumber = true;
			};
			
			if (initUnit === 'invalid unit') {
				invalidUnit = true;
			} else if (initUnit === 'l') {
				initUnit === 'L';
			} else if (initUnit === 'L') {
			} else {
				initUnit = initUnit.toLowerCase();
			};

			if (invalidNumber === true && invalidUnit === true) {
			// if both the number and unit are invalid
				res.send('invalid number and unit');
			} else if (invalidNumber === true) {
			// if just the number is invalid
				res.send('invalid number');
			} else if (invalidUnit === true) {
			// if just the unit is invalid
				res.send('invalid unit');
			} else {
			// otherwise, proceed normally

				let returnNum = convertHandler.convert(initNum, initUnit);
				let returnUnit = convertHandler.getReturnUnit(initUnit);
				let initialSpellOut = convertHandler.spellOutUnit(initUnit);
				let returnSpellOut = convertHandler.spellOutUnit(returnUnit);
				let finalString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);	
				
				res.json({
					initNum: initNum,
					initUnit: initUnit,
					returnNum: returnNum,
				 	returnUnit: returnUnit,
				 	string: finalString
				});
			};
		} catch (err) {
			console.log('Error - catch block');
			res.json({
				error: 'invalid input'
			});
		};
	});
  
};
