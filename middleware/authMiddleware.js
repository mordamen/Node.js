const { verifyToken } = require('../services/token.service');
const handleError = require('../utilities/errorHandler');

const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers['auth-token']) {
			handleError(res, 'please provide token', 401);
		} else {
			const userData = await verifyToken(req.headers['auth-token']);
			req.userData = userData;
			next();
		}
	} catch (err) {
		handleError(res, err.message, 401);
	}
};

module.exports = authMiddleware;
