import express from "express";
const router = express.Router();
import {
  createForm,
  getAllForms,
  getFormById,
} from "../controllers/formController.js";

router.route("/create_form").post(createForm);
router.route("/all_forms").get(getAllForms);
router.route("/form:id").get(getFormById);

export default router;
