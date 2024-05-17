const { Medicine } = require("../Models/Medicines");

const getMedicines = async (req, res) => {
  try {
    const medicinesData = await Medicine.find({});
    res.status(200).send({
      success: true,
      msg: "getAllMedicines",
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
    const { name, medicineType, price } = req.body;
    if (!name || !medicineType || !price) {
      return res.send("please fill the all");
    }
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
    const { name, medicineType, price } = req.body;
    if (!name || !medicineType || !price) {
      return res.send("please fill the all");
    }
    const updateData = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          medicineType,
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
    const deleteData = await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      msg: "deleted successfully",
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
