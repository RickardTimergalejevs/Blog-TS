var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginForm = document.querySelector(".login_form");
const isLoggedIn = () => {
    let user;
    user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        loginForm.style.display = "block";
        return false;
    }
    loginForm.style.display = "none";
    return true;
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
});
export { isLoggedIn, login };
