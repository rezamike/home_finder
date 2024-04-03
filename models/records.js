const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    name: {
        type: String,
        unique: false,
    },
    email: {
        type: String,
        unique: true,
    }
});

const Record = mongoose.model("Record", RecordSchema);

module.exports = Record;