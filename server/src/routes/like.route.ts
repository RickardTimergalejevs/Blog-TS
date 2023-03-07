import express from "express"
import { addLike, getLikesByPost } from "../controller/like.controller"

const likeRouter = express.Router()

likeRouter.get("/:postId", getLikesByPost)
likeRouter.post("/", addLike)

export default likeRouter