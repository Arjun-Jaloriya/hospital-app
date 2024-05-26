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

module.exports = { addSubscription };
