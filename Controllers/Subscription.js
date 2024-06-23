const { Subscription } = require("../Models/Subscription");
const { addSubscriptionSchema } = require("../Validations/Subscription");

const addSubscription = async (req, res) => {
  try {
    const { error, value } = addSubscriptionSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, month } = value;
    const addData = new Subscription(value);
    await addData.save();
    res.status(201).send({
      success: true,
      msg: "Subscription Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const getSubscriptions = async (req, res) => {
  try {
    const getData = await Subscription.find({});
    res.status(200).send({
      success: true,
      msg: "Subscription fetched",
      count:getData.length,
      results: getData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const getSubscription = async(req,res)=>{
  try {
    const getData = await Subscription.findById(req.params.id);
    res.status(200).send({
      success: true,
      msg: "Subscription fetched",
      results: getData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
}

const updateSubscription = async (req, res) => {
  try {
    const { error, value } = addSubscriptionSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, month } = value;
    const updateData = await Subscription.findByIdAndUpdate(req.params.id, {
      $set: {
        name: name,
        month: month,
      },
    });
    res.status(200).send({
      success: true,
      msg: "Subscription updated",
      results: updateData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};
module.exports = { addSubscription, getSubscriptions, updateSubscription ,getSubscription};
