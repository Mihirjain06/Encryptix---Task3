import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title!"],
    minLength: [4, "Job title must contain atleast 3 characters!"],
    maxLength: [30, "Job title cannot exceed 30 characters!"],
  },

  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [5, "Job description must contain atleast 5 characters!"],
    maxLength: [300, "Job description cannot exceed 300 characters!"],
  },

  category: {
    type: String,
    required: [true, "Job category is required!"],
  },

  country: {
    type: String,
    required: [true, "Job country is required!"],
  },

  city: {
    type: String,
    required: [true, "Job city is required!"],
  },

  location: {
    type: String,
    required: [true, "Please provide exact location!"],
    minLength: [10, "Job location must contain atleast 10 characters!"],
    maxLength: [300, "Job location cannot exceed 300 characters!"],
  },

  fixedSalary: {
    type: Number,
    minLength: [3, "Fixed Salary must contain atleast 3 digits!"],
    maxLength: [9, "Fixed Salary cannot exceed 9 digits!"],
  },

  salaryFrom: {
    type: Number,
    minLength: [3, "Salary From must contain atleast 3 digits!"],
    maxLength: [9, "Salary From cannot exceed 9 digits!"],
  },

  salaryTo: {
    type: Number,
    minLength: [3, "Salary To must contain atleast 3 digits!"],
    maxLength: [9, "Salary To cannot exceed 9 digits!"],
  },

  expired: {
    type: Boolean,
    default: false,
  },

  jobPostedOn: {
    type: Date,
    default: Date.now,
  },

  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
