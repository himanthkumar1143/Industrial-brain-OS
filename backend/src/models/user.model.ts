import mongoose, { Schema } from "mongoose"
import bcryptjs from "bcryptjs"

export type UserRole = "junior" | "senior" | "admin"

export interface IUser extends mongoose.Document {
  email: string
  password?: string
  role: UserRole
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },
    role: {
      type: String,
      enum: ["junior", "senior", "admin"],
      required: [true, "Role is required"]
    }
  },
  {
    timestamps: true
  }
)

// Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password || "", salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // If the password field wasn't selected (select: false), it needs to be fetched,
  // but if it is fetched, this.password will be defined.
  return bcryptjs.compare(candidatePassword, this.password || "")
}

export const User = mongoose.model<IUser>("User", UserSchema)
