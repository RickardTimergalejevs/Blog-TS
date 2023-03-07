"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikesByPost = exports.addLike = void 0;
const like_model_1 = __importDefault(require("../models/like.model"));
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield like_model_1.default.create(req.body);
    res.status(201).json("Like created");
});
exports.addLike = addLike;
const getLikesByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const likes = yield like_model_1.default.find({ post: req.params.postId }).populate("user");
    res.status(200).json(likes);
});
exports.getLikesByPost = getLikesByPost;
