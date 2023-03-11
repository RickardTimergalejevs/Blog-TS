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
const loginForm = document.querySelector(".login_form");
const greetingMessage = document.querySelector(".greeting_message");
const getUserFromLs = () => {
    const toParse = localStorage.getItem("user");
    let user = { username: "", id: "" };
    if (toParse) {
        return user = JSON.parse(toParse);
    }
    return;
};
const isLoggedIn = () => {
    let user;
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        loginForm.style.display = "block";
        return false;
    }
    loginForm.style.display = "none";
    showGreeting(user.username);
    logout();
    return true;
};
const showGreeting = (name) => {
    greetingMessage.innerText = "Välkommen " + name;
    greetingMessage.style.display = "block";
};
const login = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = yield response.json();
    localStorage.setItem("user", JSON.stringify(data));
    isLoggedIn();
    getPosts();
});
const logout = () => {
    const logoutBtn = document.createElement("button");
    logoutBtn.className = "logout_button";
    logoutBtn.innerText = "Logout";
    greetingMessage.insertAdjacentElement("beforebegin", logoutBtn);
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
};
export { isLoggedIn, login, getUserFromLs };
