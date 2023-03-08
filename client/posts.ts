import { Post, PopulatedPost, Like, PopulatedLike } from "./interfaces"
import { addLike, getLikes, hideLikes, showLikes } from "./likes.js"
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

        const likes: PopulatedLike[] = await getLikes(post._id)
        const likesUp = likes.filter((like: PopulatedLike) => like.type === "like")
        const likesDown = likes.filter((like: PopulatedLike) => like.type === "dislike")
        const alreadyLiked = likes.find((like: PopulatedLike) => like.user._id == user?.id)
        console.log(alreadyLiked);
        
        const thumbsDown = document.createElement("i")
        thumbsDown.classList.add("thumbs_down", "fa-regular", "fa-thumbs-down")

        if(user && !alreadyLiked) {
            thumbsUp.addEventListener("click", () => addLike("like", post._id))
            thumbsDown.addEventListener("click", () => addLike("dislike", post._id))
        }

        thumbsUp.addEventListener("mouseenter", (e) => showLikes(e, likesUp))
        thumbsUp.addEventListener("mouseleave", hideLikes)

        thumbsDown.addEventListener("mouseenter", (e) => showLikes(e, likesDown))
        thumbsDown.addEventListener("mouseleave", hideLikes)

        title.innerText = post.title
        content.innerText = post.content
        name.innerText = post.user.username
        date.innerText = post.createdAt ? post.createdAt.toString() : ""
        
        postContainer.append(title, content, name, date)

        thumbsUp.insertAdjacentText("beforeend", likesUp.length.toString())
        thumbsDown.insertAdjacentText("beforeend", likesDown.length.toString())

        postContainer.append(thumbsUp, thumbsDown)

        postList.appendChild(postContainer)
    }
}