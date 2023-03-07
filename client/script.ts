const loginForm = document.querySelector(".login_form") as HTMLDivElement
const loginInput = document.querySelector(".login_form input") as HTMLInputElement
const loginBtn = document.querySelector(".login_form button") as HTMLButtonElement

const postTitleInput = document.querySelector(".post_form input") as HTMLInputElement
const postContentInput = document.querySelector("#post_content") as HTMLTextAreaElement
const newPostBtn = document.querySelector(".post_form button") as HTMLButtonElement
const postList = document.querySelector(".post_list") as HTMLDivElement

const initApp = () => {
    isLoggedIn()
    getPosts()
}

//HANDLE USERS

interface User {
    username: string,
    id: string
}

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

const login = async () => {
    const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username: loginInput.value }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()
    localStorage.setItem("user", JSON.stringify(data))
    isLoggedIn()
}

loginBtn.addEventListener("click", login)

//HANDLE POSTS
interface Post {
    title: string,
    content: string,
    user: string,
    createdAt?: string
}

interface PopulatedPost {
    title: string,
    content: string,
    user: User,
    createdAt: string
}


const addPost = async () => {

    const toParse = localStorage.getItem("user")
    let user: User = { username: "", id: ""}

    if (toParse) {
        user = JSON.parse(toParse)
    }

    const newPost: Post = {
        title: postTitleInput.value,
        content: postContentInput.value,
        user: user.id
    }

    const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(response.ok) {
        postTitleInput.value = ""
        postContentInput.value = ""
        getPosts()
    }
}

newPostBtn.addEventListener("click", addPost)

const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts")
    const posts = await response.json()

    printPosts(posts)
}

const printPosts = (posts: PopulatedPost[]) => {
    postList.innerHTML = ""

    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    for (const post of posts) {
        const postContainer = document.createElement("div")
        const title = document.createElement("h4")
        const content = document.createElement("p")
        const name = document.createElement("p")
        const date = document.createElement("p")

        title.innerText = post.title
        content.innerText = post.content
        name.innerText = post.user.username
        date.innerText = post.createdAt ? post.createdAt.toString() : ""
        
        postContainer.append(title, content, name, date)
        postList.appendChild(postContainer)
    }
}

initApp()