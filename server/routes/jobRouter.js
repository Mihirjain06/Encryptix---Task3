import express from "express";
import {
  deleteJob,
  getAllJobs,
  getmyJobs,
  getSingleJob,
  postJob,
  updateJobs,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getAllJobs", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyJobs", isAuthorized, getmyJobs);
router.get("/:id", isAuthorized, getSingleJob);
router.put("/update/:id", isAuthorized, updateJobs);
router.delete("/delete/:id", isAuthorized, deleteJob);

export default router;
