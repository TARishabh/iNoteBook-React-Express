const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Update the URI to include the database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
