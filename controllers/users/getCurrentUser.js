const getCurrentUser = (req, res) => {
  const { email, subscription } = req.body;
  // console.log(email, subscription);
  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrentUser;
