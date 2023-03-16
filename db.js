const mongoose = require('mongoose');
const mongoDb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test1', async (err, res) => {//the the link here as per ur need
        if (err) {
            console.log(err);
        }
        else {
            console.log("MongoDb is connected");
            }})
        }
module.exports = mongoDb();