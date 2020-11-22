const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    picture : {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png"
    },
    medicine : {
        type: Array,
        default: []
    },
    doctorId : {
        type: String,
        required: true
    }

},{
    versionKey: false
});

module.exports = mongoose.model('Patients', patientSchema)