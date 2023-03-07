var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPosts } from "./posts.js";
import { getUserFromLs } from "./users.js";
export const addLike = (type, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = getUserFromLs();
    const like = {
        post: postId,
        user: user === null || user === void 0 ? void 0 : user.id,
        type
    };
    yield fetch("http://localhost:3000/api/likes", {
        method: "POST",
        body: JSON.stringify(like),
        headers: {
            "Content-Type": "application/json"
        }
    });
    getPosts();
});
export const getLikes = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/api/likes/${postId}`);
    const data = yield response.json();
    return data;
});
