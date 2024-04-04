import asyncHandler from "express-async-handler";
import Form from "../models/formModel.js";

// @desc    Create new order
// @route   POST /api/form/create_form
// @access  Public
const createForm = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  const {
    first_name,
    email,
    pincode,
    last_name,
    mobile_number,
    state,
    country,
  } = req.body;

  const alreadyExist = await Form.find(req.body);
  if (alreadyExist.length > 0) {
    return res
      .status(409)
      .json({ status: false, data: {}, message: "Form Already Exists" });
  }

  const form = new Form({
    first_name,
    last_name,
    mobile_number,
    state,
    country,
    email,
    pincode,
  });

  const savedForm = await form.save();

  res.status(201).json({ status: true, data: savedForm });
});

// @desc    Get Form by ID
// @route   GET /api/form/:id
// @access  Public
const getFormById = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  const form = await Form.findById(req.params.id);

  if (form) {
    res.status(200).json(form);
  } else {
    res.status(404).json({ status: false, message: "Form not found" });
  }
});

// @desc    Get all forms
// @route   GET /api/form/all_forms
// @access  Public
const getAllForms = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  const forms = await Form.find({});
  res
    .status(200)
    .json({ status: true, message: "Fetched All the forms", data: forms });
});

// @desc    Get Form By Id
// @route   GET /api/form/:id
// @access  Public
const updateFormByID = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  const form = await Form.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (form) {
    res.json({
      status: true,
      data: form,
      message: "Form Updated Successfully",
    });
  } else {
    res
      .status(404)
      .json({ status: false, message: "Can't Update this as Form not found" });
  }
});

// @desc    Delete a Form by ID
// @route   GET /api/form/:id
// @access  Public
const deleteAFormByID = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  const form = await Form.findByIdAndDelete(req.params.id);
  if (form) {
    res.json({
      status: true,
      data: form,
      message: "Form Deleted Successfully",
    });
  } else {
    res
      .status(404)
      .json({ status: false, message: "Can't Delete this as Form not found" });
  }
});

// @desc    DELETE ALL FORMS
// @route   GET /api/form/admin_delete_all_forms
// @access  Public
const deleteAllFormsByAdmin = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Forms']
  if (req.query) {
    let ticket = req.query.ticket;
    if (ticket === "Techno") {
      Form.deleteMany({}, (err) => {
        if (err) {
          console.error("Error emptying collection:", err);
          return res.status(400).json({ status: false, message: err.message });
        } else {
          console.log("Collection emptied successfully.");
          return res
            .status(200)
            .json({ status: true, message: "All forms Deleted" });
        }
      });
    } else {
      return res.status(401).json({ status: false, message: "Unauthorized." });
    }
  } else {
    return res.status(401).json({ status: false, message: "Unauthorized." });
  }
});

export {
  createForm,
  getFormById,
  getAllForms,
  updateFormByID,
  deleteAllFormsByAdmin,
  deleteAFormByID,
};
