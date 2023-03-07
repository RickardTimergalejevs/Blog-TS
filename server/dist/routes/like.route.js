"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controller/like.controller");
const likeRouter = express_1.default.Router();
likeRouter.get("/:postId", like_controller_1.getLikesByPost);
likeRouter.post("/", like_controller_1.addLike);
exports.default = likeRouter;
