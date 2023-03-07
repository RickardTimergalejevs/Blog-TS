import { login, isLoggedIn } from "./users.js"
import { getPosts, addPost } from "./posts.js"

const loginInput = document.querySelector(".login_form input") as HTMLInputElement
const loginBtn = document.querySelector(".login_form button") as HTMLButtonElement

const newPostBtn = document.querySelector(".post_form button") as HTMLButtonElement

const initApp = () => {
    isLoggedIn()
    getPosts()
}

//HANDLE USERS
loginBtn.addEventListener("click", () => login(loginInput.value))

//HANDLE POSTS
newPostBtn.addEventListener("click", addPost)

//HANDLE LIKES


initApp()