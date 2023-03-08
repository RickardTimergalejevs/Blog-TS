import express from "express"
import { addComment, getCommentsByPost } from "../controller/comment.controller"

const commentRouter = express.Router()

commentRouter.get("/:postId", getCommentsByPost)
commentRouter.post("/", addComment)

export default commentRouter