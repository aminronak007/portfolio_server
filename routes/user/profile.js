const router = require("express").Router();
const Profile = require("../../controllers/admin/profileController");

router.get("/profile/details", Profile.getBasicDetails);

module.exports = router;
