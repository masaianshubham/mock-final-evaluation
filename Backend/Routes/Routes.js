const express = require("express");
const { registration, login } = require("../Controllers/doctorController");
const {addPatient,getPatient, editPatient,deletePatient} = require("../Controllers/patientController")
const router = express.Router();

router.post("/register", registration)
router.post("/login", login)
router.post("/addpatient", addPatient)
router.get("/getpatient/:id", getPatient)
router.post("/editpatient/:id", editPatient)
router.delete("/deletepatient/:id", deletePatient)

module.exports = router