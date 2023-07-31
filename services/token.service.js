const config = require('config');
const jwt = require('../utilities/token/jwt');

const tokenOption = config.get('tokenOption');

const generateToken = (payload, expDate = '30d') => {
	switch (tokenOption) {
		case 'jwt':
		default:
			return jwt.generateToken(payload, (expDate = '30d'));
	}
};

const verifyToken = (token) => {
	switch (tokenOption) {
		case 'jwt':
		default:
			return jwt.verifyToken(token);
	}
};

module.exports = {
	generateToken,
	verifyToken,
};
