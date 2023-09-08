const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { owner: _id } = req.user.id;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  res.json(result);
};

// const { id } = req.user.id;
// const { page = 1, limit = 10, favorite } = req.query;
// const filterValue = favorite
//   ? { ownerId: req.user.id, favorite }
//   : { owner: id };

// const skip = (page - 1) * limit;

// // const options = { skip, limit };

// const result = await Contact.find(filterValue, "", {
//   skip,
//   limit,
// }).populate("owner", "email subscription");
// res.json(result);
// };
module.exports = listContacts;
