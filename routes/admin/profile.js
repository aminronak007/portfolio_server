const router = require("express").Router();
const Profile = require("../../controllers/admin/profileController");
const { verifyAccessToken } = require("../../middlewares/jwt");

router.post("/add/profile/details", verifyAccessToken, Profile.addbasicDetails);
router.put(
  "/update/profile/details/:id",
  verifyAccessToken,
  Profile.updateBasicDetails
);
router.get("/profile/details", verifyAccessToken, Profile.getBasicDetails);

router.put("/update/education/details/:id", Profile.updateEducation);
router.put("/update/experience/details/:id", Profile.updateExperience);

module.exports = router;
