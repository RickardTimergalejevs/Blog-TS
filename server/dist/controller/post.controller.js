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
exports.getAllPosts = exports.addPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.default.create(req.body);
    res.status(200).json(post);
});
exports.addPost = addPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.default.find({}).populate("user");
    if (!posts) {
        return res.status(404).json("No posts found");
    }
    res.status(200).json(posts);
});
exports.getAllPosts = getAllPosts;
