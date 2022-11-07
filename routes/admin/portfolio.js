const router = require("express").Router();
const { Portfolio } = require("../../controllers/admin/portfolioController");

router.post("/add/portfolio/details");
router.put("/update/portfolio/details");
router.get("/read/portfolio/details");
router.delete("/delete/portfolio/details");

module.exports = router;
