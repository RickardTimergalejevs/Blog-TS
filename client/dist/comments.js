var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserFromLs } from "./users.js";
import { getPosts } from "./posts.js";
const likesList = document.querySelector(".comments_list");
export const addComment = (content, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = getUserFromLs();
    const comment = {
        post: postId,
        user: user === null || user === void 0 ? void 0 : user.id,
        content
    };
    yield fetch("http://localhost:3000/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": "application/json"
        }
    });
    getPosts();
});
