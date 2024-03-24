import { User } from "../models/userModel.js";
import { Account } from "../models/accountModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { AuthenticationMiddleware } from "../middleware/jwtMIddleware.js";
class UserService {
  async registerUser(
    name,
    email,
    password,
    confirmPassword,
    address,
    panNumber,
    accountNumber
  ) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return "Email is already in use";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const session = await mongoose.startSession();
    session.startTransaction();
    const accountInfo = await new Account({
      panNumber,
      accountNumber,
    });
    const createUser = await new User({
      name,
      email,
      password: hashedPassword,
      address,
      accountId: accountInfo._id,
    });
    const savedUser = await createUser.save();
    const savedAccount = await accountInfo.save();
    session.commitTransaction();
    session.endSession();
    console.log(savedUser);
    console.log(savedAccount);
    return { savedUser, savedAccount };
  }

  async userLogin(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    const isCorrectPwd = await bcrypt.compare(password, user.password);
    if (!isCorrectPwd) {
      throw new BadDataError("Incorrect Password");
    }
    const jwtServciceInstance = await new AuthenticationMiddleware();
    const token = await jwtServciceInstance.generateToken(user._id);
    return { user, token };
  }
}

export { UserService };
