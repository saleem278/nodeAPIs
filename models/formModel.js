import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  pincode: { type: Number, required: true },
  mobile_number: { type: Number, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const Form = mongoose.model("Form", formSchema);

export default Form;
