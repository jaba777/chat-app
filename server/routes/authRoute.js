const express = require("express");
const {
  registerController,
  signInController,
  myProfile,
} = require("../controllers/authController.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 


const router = express.Router();

router.post("/register", upload.single("avatarImage"), registerController);
router.post("/sign-in", signInController);
router.get("/profile", myProfile);

module.exports = router;
