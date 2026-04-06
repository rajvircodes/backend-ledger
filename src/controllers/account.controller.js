const Account = require("../models/account.model");

const createAccountController = async (req, res) => {
  const user = req.user;

  const account = await Account.create({
    user: user.id,
  });

  res.status(201).json({
    account,
  });
};



module.exports = createAccountController;
