import { login, isLoggedIn } from "./users.js";
import { getPosts, addPost } from "./posts.js";
const loginInput = document.querySelector(".login_form input");
const loginBtn = document.querySelector(".login_form button");
const newPostBtn = document.querySelector(".post_form button");
const initApp = () => {
    isLoggedIn();
    getPosts();
};
//HANDLE USERS
loginBtn.addEventListener("click", () => login(loginInput.value));
//HANDLE POSTS
newPostBtn.addEventListener("click", addPost);
//HANDLE LIKES
initApp();
