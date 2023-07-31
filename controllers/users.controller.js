const authMiddleware = require('../middleware/authMiddleware');
const usersService = require('../models/services/users.service');

// REGISTER NEW USER
const registerUser = async (req, res) => {
	try {
		let normalUser = await normalizeUser(req.body);
		await userValidationService.registerUserValidation(normalUser);
		normalUser.password = await hashService.generateHash(normalUser.password);
		const dataFromDB = await usersService.registerUser(normalUser);
		res.json(dataFromDB);
	} catch (err) {
		handleError(res, err.message, 404);
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
			res.json({ msg: 'done!', token });
		}
	} catch (err) {
		handleError(res, err.message, 404);
	}
};

//GET ALL USERS,
const getAllUsers = async (req, res) => {
	try {
		const dataFromDB = await usersService.getAllUsers();
		res.json(dataFromDB);
	} catch (err) {
		handleError(res, err.message, 400);
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
			handleError(res, 'Undefind user', 404);
		}
	} catch (err) {
		handleError(res, err.message, 400);
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
	} catch (err) {
		handleError(res, err.message, 400);
	}
};

//Change account status - Business Account
const changeAccountType = async (req, res) => {
	try {
		const id = req.params.id;
		await userValidationService.userIdValidation(id);
		await usersService.updateBizUser(id);
		res.json({ msg: 'done' });
	} catch (err) {
		handleError(res, err.message, 400);
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
	} catch (err) {
		handleError(res, err.message, 400);
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
