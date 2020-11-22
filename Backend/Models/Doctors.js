const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    // patients : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patients' }]

},{
    versionKey: false
});

module.exports = mongoose.model('Doctors', doctorSchema)