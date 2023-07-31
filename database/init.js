const config = require("config");
const dbOption = config.get("dbOption");
const connectToMongoDB = require("./mongoDB.database");

const connectToDB = () => {
	switch (dbOption) {
		case "mongoDB":
			return connectToMongoDB();
			break;
	}
};

module.exports = connectToDB;
