import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [4, "Name must contain atleast 4 characters!"],
    maxLength: [20, "Name cannot exceed 20 characters!"],
  },

  email: {
    type: String,
    required: [true, "Please provide your email!"],
    validate: [validator.isEmail, "Please enter valid an email!"],
  },

  coverLetter: {
    type: String,
    required: [true, "Please provide your cover letter!"],
  },

  phone: {
    type: Number,
    required: [true, "Please provide your phone number!"],
  },

  address: {
    type: String,
    required: [true, "Please provide your address!"],
  },

  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: [true, "Please mention your job role!"],
      enum: ["Job Seeker"],
    },
  },

  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: [true, "Please mention your job role!"],
      enum: ["Employer"],
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
