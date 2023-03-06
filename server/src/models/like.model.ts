import { Schema, model, Types } from "mongoose";

export interface Like {
    post: string,
    type: "like" | "dislike",
    user: string
}

const likeSchema = new Schema({
    post: { type: Types.ObjectId, ref: "post", required: true },
    type: {type: String, required: true},
    user: {type: Types.ObjectId, ref: "user", required: true}
},
{ timestamps: true }
)

const LikeModel = model("like", likeSchema)

export default LikeModel