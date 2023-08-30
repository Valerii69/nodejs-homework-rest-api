const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
} = require("../service/contactsService.js");
const Joi = require("joi");

const contactReqBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(20),
});

const favoriteReqBodySchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const get = async (req, res, next) => {
  try {
    const results = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { value, error } = contactReqBodySchema.validate(req.body);
  const { name, email, phone } = value;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const result = await createContact({ name, email, phone });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { createdContact: result },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  const { value, error } = contactReqBodySchema.validate(req.body);
  const { name, email, phone } = value;
  const { id } = req.params;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const result = await updateContact(id, { name, email, phone });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found `,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { value, error } = favoriteReqBodySchema.validate(req.body);
  const { favorite } = value;
  const { id } = req.params;

  if (error) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  try {
    const result = await updateContact(id, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found `,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found `,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { get, getById, create, update, updateStatusContact, remove };
