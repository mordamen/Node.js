const config = require('config');
const jwtWebToken = require('jsonwebtoken');

const generateToken = (payload, expDate = '30d') =>
	new Promise((resolve, reject) => {
		jwtWebToken.sign(
			payload,
			config.get('jwt'),
			{ expiresIn: expDate },
			(error, token) => {
				if (error) reject(error);
				else resolve(token);
			}
		);
	});

const verifyToken = (token) =>
	new Promise((resolve, reject) => {
		jwtWebToken.verify(token, config.get('jwt'), (error, payload) => {
			if (error) reject(error);
			else resolve(payload);
		});
	});

module.exports = {
	generateToken,
	verifyToken,
};
