const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const {
  register,
  verifyActivation,
  resendToken,
} = require("../controllers/userAuth");

router.post("/register", upload.single("file"), register);
router.get("/activation/:id/verify/:token", verifyActivation);
router.post("/resend-token", resendToken);
module.exports = router;
