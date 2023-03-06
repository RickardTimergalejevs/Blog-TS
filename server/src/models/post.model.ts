import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    content: {type: String, required: true},
    user: {type: Types.ObjectId, ref: "user", required: true}
},
{ timestamps: true }
)

const PostModel = model("post", postSchema)

export default PostModel