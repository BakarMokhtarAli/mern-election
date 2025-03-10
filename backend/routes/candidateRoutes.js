import express from "express";
import {
  candidateProtect,
  createCandidate,
  deleteMe,
  getAllCandidates,
  getCurrentCandidate,
  getOneCandidate,
  getVerifiedCandidates,
  getVotesOfCurrentCandidate,
  signInCandidate,
  updateMe,
  updatePassword,
  verifyCode,
} from "../controllers/candidateController.js";
import { restricTo, protect } from "../controllers/authController.js";
import { deleteVote, updateVote } from "../controllers/voteController.js";
import {
  deleteCandidate,
  updatedCandidatePassword,
} from "../controllers/adminController.js";

import upload from "../config/multer.js";

const router = express.Router();

router.route("/signin").post(signInCandidate);
router.route("/verify-candidate").post(verifyCode);
router.route("/verified").get(getVerifiedCandidates);

router.route("/votes").get(candidateProtect, getVotesOfCurrentCandidate);

router.route("/get-candidate").get(candidateProtect, getCurrentCandidate);
router.route("/:id").get(candidateProtect, getOneCandidate);

router
  .route("/")
  .post(protect, restricTo("admin", "lead"), createCandidate)
  .get(getAllCandidates);

router
  .route("/update-password/:id")
  .patch(protect, restricTo("admin", "lead"), updatedCandidatePassword);
router
  .route("/delete-candidate/:id")
  .delete(protect, restricTo("admin", "lead"), deleteCandidate);

router.route("/update-password").patch(candidateProtect, updatePassword);
router
  .route("/update-me")
  .patch(candidateProtect, upload.single("photo"), updateMe);
router.route("/delete-me").patch(candidateProtect, deleteMe);

router.route("/update-vote/:id").patch(protect, updateVote);

export default router;
