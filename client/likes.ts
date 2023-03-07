import { LikeType, Like, PopulatedLike } from "./interfaces"
import { getPosts } from "./posts.js";
import { getUserFromLs } from "./users.js";

const likesList = document.querySelector(".likes_list") as HTMLDivElement

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

export const showLikes = (e: MouseEvent, likes: PopulatedLike[]) => {

    if(likes.length > 0) {
    const likesListUl = document.querySelector(".likes_list ul") as HTMLUListElement

    likesListUl.innerHTML = ""

    likesList.style.display = "block"
    likesList.style.top = e.pageY + 30 + "px"
    likesList.style.left = e.pageX + 30 + "px"

    for (const like of likes) {
        const li = document.createElement("li")
        li.innerText = like.user.username
        likesListUl.appendChild(li)
    }
    }
}

export const hideLikes = () => {
    likesList.style.display = "none"
}