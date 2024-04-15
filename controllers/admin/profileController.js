const UserProfile = require("../../models/profile");
const Admin = require("../../models/adminModel");
const {
  success,
  exception,
  error,
} = require("../../models/apiResponses/apiReponseModel");
const { statusCodeEnum } = require("../../utils/commonFun");

const addbasicDetails = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      birthdate,
      address,
      city,
      state,
      country,
      pincode,
      aboutme,
    } = req.body;
    const fullName = first_name + " " + last_name;

    const addProfile = await UserProfile.create({
      firstName: first_name,
      lastName: last_name,
      fullName,
      email,
      mobile,
      birthdate,
      address: {
        address,
        city,
        state,
        country,
        pincode,
      },
      aboutMe: aboutme,
    });

    addProfile.save((err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        success("Profile has been added.", data, statusCodeEnum.success, res);
      } else {
        res.json({ error: "Add Profile Failed !!!" });
      }
    });
  } catch {
    error("Something went Wrong...", statusCodeEnum.unauthorized, res, {});
  }
};

const updateBasicDetails = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      birthdate,
      address,
      city,
      state,
      country,
      pincode,
      aboutme,
    } = req.body;
    const fullName = first_name + " " + last_name;
    const { id } = req.params;

    let add = {
      address,
      city,
      state,
      country,
      pincode,
    };

    const updateProfile = await UserProfile.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          birthdate,
          fullName,
          email,
          mobile,
          address: add,
          aboutMe: aboutme,
        },
      }
    );

    if (updateProfile) {
      success(
        "Profile Updated Successfully.",
        updateProfile,
        statusCodeEnum.success,
        res
      );
    } else {
      error("Profile Updation Failed !!!", statusCodeEnum.badRequest, res, {});
    }
  } catch {
    error("Something went Wrong...", statusCodeEnum.unauthorized, res, {});
  }
};

const getBasicDetails = async (req, res) => {
  try {
    const getBasicDetails = await UserProfile.findOne()
      .select(
        "firstName lastName fullName email mobile birthdate address aboutMe"
      )
      .lean();

    if (getBasicDetails) {
      success("Success", getBasicDetails, statusCodeEnum.success, res);
    } else {
      res.json({ error: "Fetching Basic Details Failed !!!" });
    }
  } catch {
    error("Something went Wrong...", statusCodeEnum.unauthorized, res, {});
  }
};

const updateEducation = async (req, res) => {
  const { collegeName, course, startDate, endDate, percentage, cgpa } =
    req.body;
  const { id } = req.params;

  const updateEducation = await UserProfile.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        educationDetails: {
          collegeName,
          course,
          startDate,
          endDate,
          percentage,
          cgpa,
        },
      },
    }
  );
  if (updateEducation) {
    res.json({ success: "Education details has been updated" });
  } else {
    res.json({ error: "Update Education Details Failed !!!" });
  }
};

const updateExperience = async (req, res) => {
  const { companyName, workDone, startDate, endDate, position } = req.body;
  const { id } = req.params;

  const updateExperience = await UserProfile.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        experienceDetails: {
          companyName,
          workDone,
          startDate,
          endDate,
          position,
        },
      },
    }
  );

  if (updateExperience) {
    res.json({ success: "Education details has been updated" });
  } else {
    res.json({ error: "Update Education Details Failed !!!" });
  }
};

module.exports = {
  addbasicDetails,
  updateBasicDetails,
  getBasicDetails,
  updateEducation,
  updateExperience,
};
