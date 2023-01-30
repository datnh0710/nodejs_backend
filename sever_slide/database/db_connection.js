const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoString = process.env.DATABASE_URL
        const database = await mongoose.connect(mongoString);
        console.log(`Database connected`);
    } catch (error) {
        console.error(error);
		process.exit(1);
    }
};

module.exports = connectDB;