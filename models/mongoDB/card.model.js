const mongoose = require('mongoose');
const Image = require('./cards/Image');
const Address = require('./cards/Address');
const {
	URL,
	DEFAULT_STRING_SCHEMA_REQUIRED,
} = require('../validation/mongoose/mongoose.validation');

const cardSchema = new mongoose.Schema({
	title: DEFAULT_STRING_SCHEMA_REQUIRED,
	subTitle: DEFAULT_STRING_SCHEMA_REQUIRED,
	description: {
		...DEFAULT_STRING_SCHEMA_REQUIRED,
		maxLength: [1024, 'Description must be at most 1024 characters long'],
	},
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
	web: {
		type: String,
		match: [
			URL,
			'Invalid URL format. URL should start with "http://" or "https://"',
		],
	},
	image: Image,
	address: Address,
	bizNumber: {
		type: Number,
		minLength: [7, 'Business number must be exactly 7 digits long'],
		maxLength: [7, 'Business number must be exactly 7 digits long'],
		required: [true, 'Business number is required'],
		trim: true,
	},
	likes: [String],
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Card = mongoose.model('cards', cardSchema);

module.exports = Card;
