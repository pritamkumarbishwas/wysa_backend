import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Helper function to generate a random 3-digit string
const generateRandomDigits = () => {
    return Math.floor(100 + Math.random() * 900).toString(); // Generates a random 3-digit string
};

// User schema definition
const userSchema = new Schema(
    {
        nickname: {
            type: String,
            required: [true, "Nickname is required"],
            unique: true, // Enforces unique nickname
            lowercase: true,
            trim: true,
            index: true,
        },
        weekSleeping: {
            type: String,
            default: null,
        },
        noOfWeeks: {
            type: Number,
            default: 0,
        },
        sleepTime: {
            type: Date, // Date is suitable for time storage
            default: null, // Default value for Date fields should be null
        },
        sleepOut: {
            type: Date, // Also a Date field
            default: null,
        },
        hours: {
            type: Number, // Use Number type to represent hours
            default: 0,
        },
        sleepEfficiency: {
            type: Number,
            default: 90, // Default sleep efficiency
        },
        password: {
            type: String,
        },
        refreshToken: {
            type: String, // Field to store the refresh token for session management
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Pre-save middleware for hashing password
userSchema.pre("save", async function (next) {
    if (this.isNew) {
        // Auto-generate password if it's not provided
        if (!this.password) {
            const randomDigits = generateRandomDigits();
            this.password = `${this.nickname}${randomDigits}`; // Combine nickname with random digits
        }

        // Hash the password with bcrypt
        this.password = await bcrypt.hash(this.password, 10);
    } else if (this.isModified("password")) {
        // Hash the password if it has been modified
        this.password = await bcrypt.hash(this.password, 10);
    }

    next(); // Proceed to the next middleware or save operation
});

// Instance method to compare input password with the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Instance method to generate an access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id }, // Payload with user ID
        process.env.ACCESS_TOKEN_SECRET, // Secret for signing the token
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Expiration time
    );
};

// Instance method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id }, // Payload with user ID
        process.env.REFRESH_TOKEN_SECRET, // Secret for signing the refresh token
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // Expiration time for the refresh token
    );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
