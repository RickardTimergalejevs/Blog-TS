"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controller/comment.controller");
const commentRouter = express_1.default.Router();
commentRouter.get("/:postId", comment_controller_1.getCommentsByPost);
commentRouter.post("/", comment_controller_1.addComment);
exports.default = commentRouter;
