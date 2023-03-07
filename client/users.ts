import { User } from "./interfaces"

const loginForm = document.querySelector(".login_form") as HTMLDivElement
const greetingMessage = document.querySelector(".greeting_message") as HTMLHeadingElement

const getUserFromLs = (): User | undefined => {
    const toParse = localStorage.getItem("user")
    let user: User = { username: "", id: ""}

    if (toParse) {
        return user = JSON.parse(toParse)
    }

    return user
}

const isLoggedIn = () => {
    let user: User

    user = JSON.parse(localStorage.getItem("user")!) 

    if(!user) {
        loginForm.style.display = "block"
        return false
    } 

    loginForm.style.display = "none"
    showGreeting(user.username)
    return true
}

const showGreeting = (name: string) => {
    greetingMessage.innerText = "Välkommen " + name
    greetingMessage.style.display = "block"
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

export { isLoggedIn, login, getUserFromLs }