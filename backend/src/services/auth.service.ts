import jwt from "jsonwebtoken"
import { User, IUser, UserRole } from "../models/user.model"
import { env } from "../config/env"

export interface AuthPayload {
  token: string
  user: {
    id: string
    email: string
    role: UserRole
  }
}

export class AuthService {
  /**
   * Authenticate user credentials and return JWT payload.
   */
  public static async login(email: string, password: string): Promise<AuthPayload> {
    const formattedEmail = email.toLowerCase().trim()
    
    // Find user and explicitly select password since select is false in model
    const user = await User.findOne({ email: formattedEmail }).select("+password")
    if (!user) {
      const error: any = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      const error: any = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    )

    return {
      token,
      user: {
        id: (user._id as any).toString(),
        email: user.email,
        role: user.role
      }
    }
  }

  /**
   * Retrieve user info by ID.
   */
  public static async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id)
  }

  /**
   * Seed standard demo users (junior, senior, admin) if they do not exist.
   */
  public static async seedDemoUsers(): Promise<void> {
    const demoUsers = [
      {
        email: "junior@industrialbrainos.demo",
        password: "Demo@123",
        role: "junior" as UserRole
      },
      {
        email: "senior@industrialbrainos.demo",
        password: "Demo@123",
        role: "senior" as UserRole
      },
      {
        email: "admin@industrialbrainos.demo",
        password: "Demo@123",
        role: "admin" as UserRole
      }
    ]

    try {
      for (const demoUser of demoUsers) {
        const exists = await User.findOne({ email: demoUser.email })
        if (!exists) {
          await User.create(demoUser)
          console.log(`[Seed] Seeded demo user: ${demoUser.email} with role: ${demoUser.role}`)
        }
      }
      console.log("[Seed] Demo users check/seeding completed successfully")
    } catch (error) {
      console.error("[Seed] Error seeding demo users:", error)
    }
  }
}
