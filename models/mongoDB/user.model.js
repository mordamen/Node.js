const mongoose = require('mongoose');
const Name = require('./users/Name');
const Address = require('./users/Address');
const Image = require('./users/Image');

const userSchema = new mongoose.Schema({
	name: Name,
	phone: {
		type: String,
		required: [true, 'Phone number is required'],
		match: [
			RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
			'Invalid phone number format',
		],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [
			RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
			'Invalid email format',
		],
		lowercase: true,
		trim: true,
		unique: [true, 'Email already exists'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		match: [
			RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
		],
	},
	image: Image,
	address: Address,
	isAdmin: { type: Boolean, default: false },
	isBusiness: { type: Boolean, default: false },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('users', userSchema);

module.exports = User;
