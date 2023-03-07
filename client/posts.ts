import { Post, PopulatedPost, Like } from "./interfaces"
import { addLike, getLikes } from "./likes.js"
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

const printPosts = async (posts: PopulatedPost[]) => {
    postList.innerHTML = ""
    const user = getUserFromLs()

        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    for (const post of posts) {
        const postContainer = document.createElement("div")
        const title = document.createElement("h4")
        const content = document.createElement("p")
        const name = document.createElement("p")
        const date = document.createElement("p")

        const thumbsUp = document.createElement("i")
        thumbsUp.classList.add("thumbs_up", "fa-regular", "fa-thumbs-up")
        thumbsUp.addEventListener("click", () => addLike("like", post._id))

        const thumbsDown = document.createElement("i")
        thumbsDown.classList.add("thumbs_down", "fa-regular", "fa-thumbs-down")
        thumbsDown.addEventListener("click", () => addLike("dislike", post._id))

        title.innerText = post.title
        content.innerText = post.content
        name.innerText = post.user.username
        date.innerText = post.createdAt ? post.createdAt.toString() : ""
        
        postContainer.append(title, content, name, date)

        const likes = await getLikes(post._id)
        const alreadyLiked = likes.find((like: Like) => like.user == user?.id)

        if (user && !alreadyLiked) {
            postContainer.append(thumbsUp, thumbsDown)
        }

        postList.appendChild(postContainer)
    }
}