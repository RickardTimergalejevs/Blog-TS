"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Types.ObjectId, ref: "post", required: true },
    type: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });
const LikeModel = (0, mongoose_1.model)("like", likeSchema);
exports.default = LikeModel;
