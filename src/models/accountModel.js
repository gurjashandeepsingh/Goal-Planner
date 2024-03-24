import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  panNumber: { type: String, require: true },
  accountNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  currency: { type: String, default: "INR" },
});

const Account = new mongoose.model("Account", accountSchema);
export { Account };
