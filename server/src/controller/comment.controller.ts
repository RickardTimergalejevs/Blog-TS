import CommentModel from "../models/comment.model";
import { Request, Response } from "express";

const addComment = async (req: Request, res: Response) => {
    const comment = await CommentModel.create(req.body)
    res.status(201).json("Comment created")
}

const getCommentsByPost = async (req: Request, res: Response) => {
    const comments = await CommentModel.find({ post: req.params.postId })
    res.status(200).json(comments)
}

export { addComment, getCommentsByPost }