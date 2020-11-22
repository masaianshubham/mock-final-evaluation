const Patients = require("../Models/Patients");
const {patientValidation} = require("../Validation/Validation");

const addPatient = async (req, res) => {
  const { error } = patientValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const patient = await new Patients({ ...req.body }).save();
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  try {

    const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc'? -1 : 0;
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const filter = req.query.gender === 'Female' ? 'Female' : req.query.gender === 'Male' ? 'Male' : null;
        const searchQuery = {doctorId: id}
        if (filter) {
          searchQuery['gender'] = filter;
      }
      const patient = await Patients.find(searchQuery)
            .sort({ age: sort })
            .skip((page - 1) * limit)
            .limit(limit)
      const count = await Patients.countDocuments(searchQuery).exec();
      const totalPages = Math.ceil(count / limit);
    res.status(200).json({patient,totalPages});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const editPatient = async (req, res) => {
  Patients.findById(req.params.id)
    .then((target) => {
      target.name = req.body.name;
      target.age = req.body.age;
      target.medicine = req.body.medicine;
      target.picture = req.body.picture;
      target.gender = req.body.gender;
      target
        .save()
        .then(() => res.json({ message: "edited successfully" }))
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => console.log(err));
};

const deletePatient = async (req, res) => {
  Patients.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "deleted successfully" }))
    .catch((err) => console.log(err));
};

const single = async (req, res) => {
  try {
    let patient = await Patients.find({ _id: req.params.id });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addPatient, getPatient, editPatient, single, deletePatient };
