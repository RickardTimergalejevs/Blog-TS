import { Comment } from "./interfaces"
import { getUserFromLs } from "./users.js"
import { getPosts } from "./posts.js"

export const addComment = async (content: string, postId: string) => {
    const user = getUserFromLs()

    const comment = {
        post: postId,
        user: user?.id,
        content
    }

    await fetch("http://localhost:3000/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
        "Content-Type": "application/json"
    }
})
getPosts()
}

export const getComments = async (postId: string) => {
    const response = await fetch(`http://localhost:3000/api/comments/${postId}`)
    const data = await response.json()

    return data
}

export const showComments = (ul: HTMLUListElement, comments: Comment[]) => {
        for(const comment of comments) {
            const li = document.createElement("li")
            const username = document.createElement("h3")
            username.className = "comment_username"
            const content = document.createElement("p")
            content.className = "comment_content"

            username.innerText = comment.user.username
            content.innerText = comment.content

            li.append(username, content)
            ul.appendChild(li)
        }
}