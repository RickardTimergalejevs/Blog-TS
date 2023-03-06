"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controller/post.controller");
const postRouter = express_1.default.Router();
postRouter.get("/", post_controller_1.getAllPosts);
postRouter.post("/", post_controller_1.addPost);
exports.default = postRouter;
