"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });
const PostModel = (0, mongoose_1.model)("post", postSchema);
exports.default = PostModel;
