const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite } = req.query;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner, favorite: true } : {};
  const options = { skip, limit };

  try {
    const result = await Contact.find(
      query,
      "-createdAt -updatedAt",
      options
    ).populate("owner", "email");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
module.exports = listContacts;
