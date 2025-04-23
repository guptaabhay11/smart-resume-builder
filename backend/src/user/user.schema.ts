import { model, Schema } from "mongoose";
import { type IUser } from "./user.dto";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    pdf: {
      type: [String],
    },
    refreshToken: {
      type: String,
    }
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export default model<IUser>("User", UserSchema);
