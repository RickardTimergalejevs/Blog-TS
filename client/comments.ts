import { getUserFromLs } from "./users.js"
import { getPosts } from "./posts.js"

const likesList = document.querySelector(".comments_list") as HTMLDivElement

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

