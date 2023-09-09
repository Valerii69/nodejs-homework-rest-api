const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  if (favorite !== null) {
    query.favorite = favorite;
    console.log(query);
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

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
