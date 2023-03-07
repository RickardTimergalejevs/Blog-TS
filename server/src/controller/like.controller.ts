import LikeModel from "../models/like.model";
import { Request, Response } from "express";

const addLike = async (req: Request, res: Response) => {
    const like = await LikeModel.create(req.body)
    res.status(201).json("Like created")
}

const getLikesByPost = async (req: Request, res: Response) => {
    const likes = await LikeModel.find({ post: req.params.postId })
    res.status(200).json(likes)
}

export { addLike, getLikesByPost }