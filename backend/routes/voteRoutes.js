import express from "express";
import {
  deleteVote,
  getAllVotes,
  getCandidateVotes,
  vote,
} from "../controllers/voteController.js";
import { protect } from "../controllers/authController.js";
import { getYourVote } from "../controllers/voterController.js";

const router = express.Router();

router.route("/").get(getAllVotes);
router.route("/candidate/:id").get(getCandidateVotes);

router.route("/:id").post(protect, vote);
router.route("/voter").get(protect, getYourVote);

router.route("/delete-vote").delete(protect, deleteVote);
export default router;
