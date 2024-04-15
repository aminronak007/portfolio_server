const mongoose = require("mongoose");
const { encryptPassword } = require("../utils/passwordCheck");

// const options = {
//   collection: 'adminUser',
//   versionKey: false,
//   toObject: {
//     virtuals: true
//   },
//   toJSON: {
//     virtuals: true
//   },
//   timestamps: {
//     createdAt: 'createdDate',
//     updatedAt: 'updatedDate'
//   }
// };

const adminSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: "adminUser",
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  this.password = await encryptPassword(this.password);
  next();
});

module.exports = mongoose.model("adminUser", adminSchema);
