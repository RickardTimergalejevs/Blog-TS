var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addLike, getLikes } from "./likes.js";
import { getUserFromLs } from "./users.js";
const postTitleInput = document.querySelector(".post_form input");
const postContentInput = document.querySelector("#post_content");
const postList = document.querySelector(".post_list");
export const addPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = getUserFromLs();
    if (user) {
        const newPost = {
            title: postTitleInput.value,
            content: postContentInput.value,
            user: user.id
        };
        const response = yield fetch("http://localhost:3000/api/posts", {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            postTitleInput.value = "";
            postContentInput.value = "";
            getPosts();
        }
    }
});
export const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:3000/api/posts");
    const posts = yield response.json();
    printPosts(posts);
});
const printPosts = (posts) => __awaiter(void 0, void 0, void 0, function* () {
    postList.innerHTML = "";
    const user = getUserFromLs();
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    for (const post of posts) {
        const postContainer = document.createElement("div");
        const title = document.createElement("h4");
        const content = document.createElement("p");
        const name = document.createElement("p");
        const date = document.createElement("p");
        const thumbsUp = document.createElement("i");
        thumbsUp.classList.add("thumbs_up", "fa-regular", "fa-thumbs-up");
        thumbsUp.addEventListener("click", () => addLike("like", post._id));
        const thumbsDown = document.createElement("i");
        thumbsDown.classList.add("thumbs_down", "fa-regular", "fa-thumbs-down");
        thumbsDown.addEventListener("click", () => addLike("dislike", post._id));
        title.innerText = post.title;
        content.innerText = post.content;
        name.innerText = post.user.username;
        date.innerText = post.createdAt ? post.createdAt.toString() : "";
        postContainer.append(title, content, name, date);
        const likes = yield getLikes(post._id);
        const alreadyLiked = likes.find((like) => like.user == (user === null || user === void 0 ? void 0 : user.id));
        if (user && !alreadyLiked) {
            postContainer.append(thumbsUp, thumbsDown);
        }
        postList.appendChild(postContainer);
    }
});
