import { Comment } from "./interfaces"
import { getUserFromLs } from "./users.js"
import { getPosts } from "./posts.js"

const commentsList = document.querySelector(".comments_list") as HTMLDivElement

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

export const showComments = (app: HTMLUListElement, comments: Comment[]) => {

        const commentsListUl = document.querySelector(".comments_list ul") as HTMLUListElement

        //commentsListUl.innerHTML = ""

        for(const comment of comments) {
            const li = document.createElement("li")
            li.innerText = `${comment.user.username} = ${comment.content}`
            app.appendChild(li)
        }
}