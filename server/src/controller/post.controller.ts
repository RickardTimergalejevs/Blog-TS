import PostModel from "../models/post.model";
import { Request, Response } from "express";

const addPost = async (req: Request, res: Response) => {
    const post = await PostModel.create(req.body)
    res.status(200).json(post)
}

const getAllPosts = async (req: Request, res: Response) => {
    const posts = await PostModel.find({})
    
    if(!posts) {
        return res.status(404).json("No posts found")
    }
    
    res.status(200).json(posts)
}

export { addPost, getAllPosts }