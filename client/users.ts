import { User } from "./interfaces"

const loginForm = document.querySelector(".login_form") as HTMLDivElement

const isLoggedIn = () => {
    let user: User

    user = JSON.parse(localStorage.getItem("user")!) 

    if(!user) {
        loginForm.style.display = "block"
        return false
    } 

    loginForm.style.display = "none"
    return true
}

const login = async (username: string) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    localStorage.setItem("user", JSON.stringify(data))
    isLoggedIn()
}

export { isLoggedIn, login }