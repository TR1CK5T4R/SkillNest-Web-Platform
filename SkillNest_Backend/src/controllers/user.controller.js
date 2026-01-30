import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation- not empty
    // check if user already exists:username and emails
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation 
    // return response

    console.log("🔥 CONTROLLER BODY:", req.body);

    if (!req.body) {
        throw new ApiError(400, "Request body missing");
    }

    const { email, username, password } = req.body

    // console.log('email: ', email);

    if (
        !email?.trim() ||
        !username?.trim() ||
        !password?.trim()
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists with this email or username")
    }

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");


    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user, try again");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
});

export { registerUser };