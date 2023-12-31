const mongoose = require('mongoose');
const {
	URL,
	DEFAULT_STRING_SCHEMA_REQUIRED,
} = require('../../validation/mongoose/mongoose.validation');

const Image = new mongoose.Schema({
	url: URL,
	alt: DEFAULT_STRING_SCHEMA_REQUIRED,
});

module.exports = Image;
