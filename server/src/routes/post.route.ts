import express from "express"
import { getAllPosts, addPost } from "../controller/post.controller"

const postRouter = express.Router()

postRouter.get("/", getAllPosts)
postRouter.post("/", addPost)

export default postRouter