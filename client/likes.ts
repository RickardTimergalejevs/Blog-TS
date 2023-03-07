import { LikeType } from "./interfaces"
import { getPosts } from "./posts.js";
import { getUserFromLs } from "./users.js";

export const addLike = async (type: LikeType, postId: string) => {
    const user = getUserFromLs()

    const like = {
        post: postId,
        user: user?.id,
        type
    }

    await fetch("http://localhost:3000/api/likes", {
    method: "POST",
    body: JSON.stringify(like),
    headers: {
        "Content-Type": "application/json"
    }
})
getPosts()
}

export const getLikes = async (postId: string) => {
    const response = await fetch(`http://localhost:3000/api/likes/${postId}`)
    const data = await response.json()

    return data
}
