var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addComment, getComments, showComments } from "./comments.js";
import { addLike, getLikes, hideLikes, showLikes } from "./likes.js";
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
        const likes = yield getLikes(post._id);
        const likesUp = likes.filter((like) => like.type === "like");
        const likesDown = likes.filter((like) => like.type === "dislike");
        const alreadyLiked = likes.find((like) => like.user._id == (user === null || user === void 0 ? void 0 : user.id));
        const thumbsDown = document.createElement("i");
        thumbsDown.classList.add("thumbs_down", "fa-regular", "fa-thumbs-down");
        if (user && !alreadyLiked) {
            thumbsUp.addEventListener("click", () => addLike("like", post._id));
            thumbsDown.addEventListener("click", () => addLike("dislike", post._id));
        }
        thumbsUp.addEventListener("mouseenter", (e) => showLikes(e, likesUp));
        thumbsUp.addEventListener("mouseleave", hideLikes);
        thumbsDown.addEventListener("mouseenter", (e) => showLikes(e, likesDown));
        thumbsDown.addEventListener("mouseleave", hideLikes);
        //COMMENTS
        const comments = yield getComments(post._id);
        const commentsList = document.createElement("ul");
        if (user) {
            const commentInput = document.createElement("input");
            commentInput.className = "comment_input";
            const commentBtn = document.createElement("button");
            commentBtn.className = "comment_button";
            commentBtn.innerText = "Skicka";
            commentBtn.addEventListener("click", () => addComment(commentInput.value, post._id));
            commentsList.insertAdjacentElement("afterbegin", commentBtn);
            commentsList.insertAdjacentElement("afterbegin", commentInput);
        }
        showComments(commentsList, comments);
        title.innerText = post.title;
        content.innerText = post.content;
        name.innerText = post.user.username;
        date.innerText = post.createdAt ? post.createdAt.toString() : "";
        postContainer.append(title, content, name, date);
        thumbsUp.insertAdjacentText("beforeend", likesUp.length.toString());
        thumbsDown.insertAdjacentText("beforeend", likesDown.length.toString());
        postContainer.append(thumbsUp, thumbsDown, commentsList);
        postList.appendChild(postContainer);
    }
});
