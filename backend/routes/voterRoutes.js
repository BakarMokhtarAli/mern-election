import express from "express";
import {
  createAdmin,
  createVoter,
  getAdmin,
  getAllAdmins,
  getAllVoters,
  getOneVoter,
  getYourVote,
  updateVoter,
  updatedVoterPassword,
} from "../controllers/voterController.js";
import { protect, restricTo } from "../controllers/authController.js";
import { candidateProtect } from "../controllers/candidateController.js";
import {
  activateAccount,
  changeToAdmin,
  changeToVoter,
  deactivateAccount,
  deleteVoter,
  getAllDeActiveAccounts,
  getUnverifiedVoter,
} from "../controllers/adminController.js";
import upload from "../config/multer.js";
const router = express.Router();

router
  .route("/")
  .get(getAllVoters)
  .post(protect, restricTo("admin", "lead"), createVoter);
router
  .route("/deactivated")
  .get(protect, restricTo("admin", "lead"), getAllDeActiveAccounts);

router
  .route("/unverified")
  .get(protect, restricTo("admin", "lead"), getUnverifiedVoter);
router
  .route("/activate/:id")
  .patch(protect, restricTo("admin", "lead"), activateAccount);
router
  .route("/deactivate/:id")
  .patch(protect, restricTo("admin", "lead"), deactivateAccount);

router
  .route("/delete-voter/:id")
  .delete(protect, restricTo("admin", "lead"), deleteVoter);

// router.route("/vote").get(protect, getYourVote);

router.route("/admins").get(protect, restricTo("admin", "lead"), getAllAdmins);
router.route("/:id").get(getOneVoter);

router
  .route("/:id")
  .patch(protect, restricTo("admin", "lead"), updateVoter)
  .put(protect, restricTo("admin", "lead"), updatedVoterPassword);
router.route("/admin").post(protect, restricTo("admin", "lead"), createAdmin);
router.route("/admin/:id").get(protect, restricTo("admin", "lead"), getAdmin);
router
  .route("/change-to-admin/:id")
  .patch(protect, restricTo("lead"), changeToAdmin);
router
  .route("/change-to-voter/:id")
  .patch(protect, restricTo("lead"), changeToVoter);

export default router;
