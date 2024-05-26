const { Medicine } = require("../Models/Medicines");
const { addMedicineSchema } = require("../Validations/Medicine");

const getMedicines = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const perpage = req.query.perpage ? req.query.perpage : 5;
    const page = req.query.page ? req.query.page : 1;
    const count = await Medicine.find({
      $or: [{ name: { $regex: search, $options: "i" } }],
    });
    const medicinesData = await Medicine.find({})
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      msg: "getAllMedicines",
      count: count.length,
      results: medicinesData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};

const addMedicine = async (req, res) => {
  try {
    const { error, value } = addMedicineSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });
    const { name, medicineType, drug, price } = value;

    const add = new Medicine({
      ...req.body,
    });
    await add.save();
    res.status(201).send({
      success: true,
      msg: "medicine created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};
const updateMedicine = async (req, res) => {
  try {
    const { error, value } = addMedicineSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });
    const { name, medicineType, drug, price } = value;
    const updateData = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          medicineType,
          drug: drug,
          price,
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send({
      success: true,
      msg: "medicine updated Successfully",
      results: updateData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, msg: "something went wrong", error });
  }
};
const getMedicine = async (req, res) => {
  try {
    const getData = await Medicine.findById(req.params.id);
    res.status(200).send({
      succes: true,
      msg: "fetched medicine",
      results: getData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};

module.exports = {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
};
