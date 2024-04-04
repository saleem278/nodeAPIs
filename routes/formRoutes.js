import express from "express";
const router = express.Router();
import {
  createForm,
  getAllForms,
  getFormById,
  updateFormByID,
  deleteAFormByID,
  deleteAllFormsByAdmin,
} from "../controllers/formController.js";


router.route("/admin_delete_all_forms").get(deleteAllFormsByAdmin);
router.route("/create_form").post(createForm);
router.route("/update").post(updateFormByID);
router.route("/all_forms").get(getAllForms);
router.route("/:id").get(getFormById);
router.route("/delete/:id").get(deleteAFormByID);

export default router;
