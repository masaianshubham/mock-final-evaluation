const Doctor = require("../Models/Doctors");
const bcrypt = require("bcryptjs");
const {
  loginValidation,
  registerValidation,
} = require("../Validation/Validation");

const registration = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await Doctor.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists in the database");
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  const user = new Doctor({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    const customerExists = await Doctor.findOne({
      email: req.body.email,
      name: req.body.name,
    });
    if (customerExists) {
      return res.send(customerExists);
    }
    const customer = new Doctor({
      name: req.body.name,
      email: req.body.email,
    });
    let savedCustomer = await customer.save();
    res.send(savedCustomer);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await Doctor.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const customerExists = await Doctor.findOne({
    email: user.email,
    name: user.name,
  });

  res.send({ user: customerExists, Message: "Login Successfully!" });
};

module.exports = { registration, login };
