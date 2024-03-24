import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: {
    type: String,
    unique: true,
    require: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      },
      message: "Inavlid Email",
    },
  },
  password: { type: String, require: true },
  address: { type: String, require: true },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: true,
  },
});

const User = new mongoose.model("User", userSchema);
export { User };
