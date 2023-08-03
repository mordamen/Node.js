const usersService = require('../services/users.service');
const tokenService = require('../services/token.service');
const userValidationService = require('../services/validation_users.service');
const hashService = require('../services/hash.service');
const normalizeUser = require('../models/mongoDB/users/helpers/normalize_user');
const handleError = require('../middleware/errorHandler.middleware');

// REGISTER NEW USER
const registerUser = async (req, res) => {
	try {
		let normalizedUser = await normalizeUser(req.body);
		await userValidationService.registerUserValidation(normalizedUser);
		normalizedUser.password = await hashService.generateHash(
			normalizedUser.password
		);
		const dataFromDB = await usersService.registerUser(normalizedUser);
		res.json(dataFromDB);
	} catch (error) {
		handleError(res, 404, error.message);
	}
};

// LOGIN USER
const loginUser = async (req, res) => {
	try {
		await userValidationService.loginUserValidation(req.body);
		let { email, password } = req.body;
		let dataFromDB = await usersService.getUserByEmail(email);
		if (
			!dataFromDB ||
			!(await hashService.cmpHash(password, dataFromDB.password))
		) {
			throw new Error('Invaild email or password');
		} else {
			let token = await tokenService.generateToken({
				isAdmin: dataFromDB.isAdmin,
				isBiz: dataFromDB.isBiz,
				_id: dataFromDB._id,
			});
			res.json({ msg: 'Login Successful!', token });
		}
	} catch (error) {
		handleError(res, 404, error.message);
	}
};

//GET ALL USERS,
const getAllUsers = async (req, res) => {
	try {
		const dataFromDB = await usersService.getAllUsers();
		res.json(dataFromDB);
	} catch (error) {
		handleError(res, 400, error.message);
	}
};

//Get specific user,
const getUser = async (req, res) => {
	try {
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDB = await usersService.getUserById(req.params.id);
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 404, 'Undefind user');
		}
	} catch (error) {
		handleError(res, 400, error.message);
	}
};

//Edit user
const editUser = async (req, res) => {
	try {
		let normalUser = await normalizeUser(req.body);
		await userValidationService.userIdValidation(req.params.id);
		await userValidationService.updateUserValidation(normalUser);
		const dataFromDB = await usersService.updateUser(req.params.id, normalUser);
		if (dataFromDB) {
			res.json(dataFromDB);
		} else {
			handleError(res, 'Undefind user', 404);
		}
	} catch (error) {
		handleError(res, 400, error.message);
	}
};

//Change account status - Business Account
const changeAccountType = async (req, res) => {
	try {
		const id = req.params.id;
		await userValidationService.userIdValidation(id);
		await usersService.updateBizUser(id);
		res.json({ msg: 'done' });
	} catch (error) {
		handleError(res, 400, error.message);
	}
};

//Delete User
const deleteUser = async (req, res) => {
	try {
		await userValidationService.userIdValidation(req.params.id);
		const dataFromDb = await usersService.deleteUser(req.params.id);
		res.json({
			msg: `user - ${dataFromDb.name.first} ${dataFromDb.name.last} deleted`,
		});
	} catch (error) {
		handleError(res, 400, error.message);
	}
};

module.exports = {
	registerUser,
	loginUser,
	getAllUsers,
	getUser,
	editUser,
	changeAccountType,
	deleteUser,
};
