const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    address: {
      type: Object,
    },
    aboutMe: {
      type: String,
    },
    educationDetails: [
      {
        type: Array,
      },
    ],
    experienceDetails: [
      {
        type: Array,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User_Profile", profileSchema);
