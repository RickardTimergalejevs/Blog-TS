"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Types.ObjectId, ref: "post", required: true },
    content: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });
const CommentModel = (0, mongoose_1.model)("comment", commentSchema);
exports.default = CommentModel;
