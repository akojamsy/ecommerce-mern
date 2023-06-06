const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const {
  register,
  verifyActivation,
  resendToken,
  login,
  getUser,
} = require("../controllers/userAuth");
const { authenticated } = require("../middlewares/auth");

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/activation/:id/verify/:token", verifyActivation);
router.post("/resend-token", resendToken);
router.get("/user", authenticated, getUser);

module.exports = router;
