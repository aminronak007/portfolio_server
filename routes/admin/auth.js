const router = require("express").Router();
const authController = require("../../controllers/admin/authController");

// router.post("/admin/register", authController.adminRegister);
router.post("/admin/login", authController.adminLogin);
router.get("/admin/logout", authController.adminLogout);

module.exports = router;
