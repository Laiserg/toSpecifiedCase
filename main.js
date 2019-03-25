
(function(global) {

	// require unicode characters data
	var UnicodeData = (typeof require !== 'undefined') ?
	require('data/unicodecharsdb.js') :
	global.UnicodeData;


	function toSpecifiedCase(string, toLowCase = true, swapFirstLetter = false) {

		if (typeof string !== 'string') return string;

		let arrayOfStringLetters = string.split("");
		let result = "";


		if (toLowCase) { // если нужно привести к нижнему регистру

			arrayOfStringLetters.forEach(function(char) { // проходимся по каждому символу
				UnicodeData.forEach(function(value, key) { // сравниваем с таблицей символов юникода, key - заглавные символы, value - строчные

					if (swapFirstLetter) { // если стоит флаг "инвертировать первую букву", то сразу инвертируем, сбрасываем флаг и завершаем итерацию
						result += String.fromCharCode(key);
						swapFirstLetter = false;
						continue;
					}

					if (char.charCodeAt(0) == key) {
						result += String.fromCharCode(value);
					} else if (char.charCodeAt(0) == value) {
						result += String.fromCharCode(value);
					}
				});
			});

		} else { // если нужно привести к верхнему регистру

			arrayOfStringLetters.forEach(function(char) {
				UnicodeData.forEach(function(value, key) {

					if (swapFirstLetter) {
						result += String.fromCharCode(value);
						swapFirstLetter = false;
						continue;
					}

					if (char.charCodeAt(0) == value) {
						result += String.fromCharCode(key);
					} else if (char.charCodeAt(0) == key) {
						result += String.fromCharCode(key);
					}
				});
			});
		}

		return result;

	}

}