import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshTokens } from "../utils/tokenUtils.js";

const registerUser = asyncHandler(async (req, res) => {
    const { nickname } = req.body;

     if (!nickname) { 
        throw new ApiError(400, "Nickname is required");
    }

    const normalizedNickname = nickname.toLowerCase();

    // Check if user already exists
    let user = await User.findOne({ nickname: normalizedNickname });

    if (user) {
        // Generate new tokens for the existing user
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        // Exclude sensitive information from response
        const userData = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200).json(
            new ApiResponse(200, {
                ...userData.toObject(),
                accessToken,
                refreshToken
            }, "User already exists")
        );
    }

    // Create a new user if it does not exist
    user = await User.create({
        nickname: normalizedNickname
    });

    // Generate tokens for the newly created user
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Exclude sensitive information from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json(
        new ApiResponse(200, {
            ...createdUser.toObject(),
            accessToken,
            refreshToken
        }, "User registered successfully")
    );


});

const updateFewWeeks = asyncHandler(async (req, res) => {
    const { weekSleeping } = req.body;

    // Check if weekSleeping value is provided
    if (!weekSleeping) {
        throw new ApiError(400, "weekSleeping is required");
    }

    // Update the user document by ID, specifically the weekSleeping field
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { weekSleeping }, // Using shorthand notation for the field update
        },
        { new: true } // Option to return the updated document
    ).select("-password"); // Exclude password from the response

    // Respond with the updated user data and a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "weekSleeping updated successfully")
    );

    
});

const updateNoOfWeeks = asyncHandler(async (req, res) => {
    const { noOfWeeks } = req.body;

    // Check if noOfWeeks value is provided
    if (!noOfWeeks) {
        throw new ApiError(400, "no Of Weeks is required");
    }

    // Update the user document by ID, specifically the noOfWeeks field
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { noOfWeeks }, // Using shorthand notation for the field update
        },
        { new: true } // Option to return the updated document
    ).select("-password"); // Exclude password from the response

    // Respond with the updated user data and a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "no Of Weeks updated successfully")
    );
});

const updateSleepTime = asyncHandler(async (req, res) => {
    const { sleepTime } = req.body;

    // Check if sleepTime value is provided
    if (!sleepTime) {
        throw new ApiError(400, "sleepTime is required");
    }

    // Update the user document by ID, specifically the sleepTime field
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { sleepTime }, // Using shorthand notation for the field update
        },
        { new: true } // Option to return the updated document
    ).select("-password"); // Exclude password from the response

    // Respond with the updated user data and a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "sleepTime updated successfully")
    );
});



const updateSleepOut = asyncHandler(async (req, res) => {
    const { sleepOut } = req.body;

    // Check if sleepOut value is provided
    if (!sleepOut) {
        throw new ApiError(400, "sleepOut is required");
    }

    // Update the user document by ID, specifically the sleepOut field
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { sleepOut }, // Using shorthand notation for the field update
        },
        { new: true } // Option to return the updated document
    ).select("-password"); // Exclude password from the response

    // Respond with the updated user data and a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "sleepOut updated successfully")
    );
});


const updateHours = asyncHandler(async (req, res) => {
    const { hours } = req.body;

    // Check if hours value is provided
    if (!hours) {
        throw new ApiError(400, "hours is required");
    }

    // Update the user document by ID, specifically the hours field
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { hours }, // Using shorthand notation for the field update
        },
        { new: true } // Option to return the updated document
    ).select("-password"); // Exclude password from the response

    // Respond with the updated user data and a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "hours updated successfully")
    );
});


const getSleepEfficiency = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id)

    return res.status(200).json(
        new ApiResponse(200, user, "user Sleep Efficiency fetch successfully")
    );
});





export {
    registerUser,
    updateFewWeeks,
    updateNoOfWeeks,
    updateSleepTime,
    updateSleepOut,
    updateHours,
    getSleepEfficiency
};
