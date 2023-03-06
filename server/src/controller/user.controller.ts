import UserModel from "../models/user.model";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
    const user = await UserModel.create(req.body)
    res.status(200).json(user)
}

const loginUser = async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ username: req.body.username })

    if(!user) {
        return res.status(401).json("User does not exist")
    }

    res.status(200).json({
        username: user.username,
        id: user._id
    })
}

export { registerUser, loginUser }