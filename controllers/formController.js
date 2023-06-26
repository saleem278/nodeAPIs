import asyncHandler from "express-async-handler";
import Form from "../models/formModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createForm = asyncHandler(async (req, res) => {
  const { first_name, last_name, mobile_number, state, city } = req.body;

  const form = new Form({
    first_name,
    last_name,
    mobile_number,
    state,
    city,
  });

  const savedForm = await form.save();

  res.status(201).json(savedForm);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getFormById = asyncHandler(async (req, res) => {
  const form = await Form.findById(req.params.id);

  if (form) {
    res.json(form);
  } else {
    res.status(404);
    throw new Error("Form not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getAllForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({});
  res.json(forms);
});

export { createForm, getFormById, getAllForms };
