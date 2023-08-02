const chalk = require('chalk');

// errorHandler.js
const handleError = (res, status, message = 'Internal Server Error') => {
	res.locals.errorMessage = message;

	console.error(message); // Optionally log the error message to the console

	return res.status(status).json({ error: message });
};

module.exports = handleError;
