import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
    post: { type: Types.ObjectId, ref: "post", required: true },
    content: {type: String, required: true},
    user: {type: Types.ObjectId, ref: "user", required: true}
},
{ timestamps: true }
)

const CommentModel = model("comment", commentSchema)

export default CommentModel