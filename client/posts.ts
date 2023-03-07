import { Post, PopulatedPost } from "./interfaces"
import { addLike } from "./likes.js"
import { getUserFromLs } from "./users.js"

const postTitleInput = document.querySelector(".post_form input") as HTMLInputElement
const postContentInput = document.querySelector("#post_content") as HTMLTextAreaElement
const postList = document.querySelector(".post_list") as HTMLDivElement

export const addPost = async () => {
    const user = getUserFromLs()

    if(user) {
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
}

export const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts")
    const posts = await response.json()

    printPosts(posts)
}

const printPosts = (posts: PopulatedPost[]) => {
    postList.innerHTML = ""
    const user = getUserFromLs()

    if(user) {
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    for (const post of posts) {
        const postContainer = document.createElement("div")
        const title = document.createElement("h4")
        const content = document.createElement("p")
        const name = document.createElement("p")
        const date = document.createElement("p")

        const thumbsUp = document.createElement("i")
        thumbsUp.classList.add("thumbs_up", "fa-regular", "fa-thumbs-up")
        thumbsUp.addEventListener("click", () => addLike("like", user.id, post._id))

        const thumbsDown = document.createElement("i")
        thumbsDown.classList.add("thumbs_down", "fa-regular", "fa-thumbs-down")
        thumbsDown.addEventListener("click", () => console.log("Tumme Ner"))

        title.innerText = post.title
        content.innerText = post.content
        name.innerText = post.user.username
        date.innerText = post.createdAt ? post.createdAt.toString() : ""
        
        postContainer.append(title, content, name, date, thumbsUp, thumbsDown)
        postList.appendChild(postContainer)
    }
    }
}