export interface User {
    username: string,
    id: string
}

type userId = User | string

export interface Post {
    title: string,
    content: string,
    user: userId,
    createdAt?: string
}

export interface PopulatedPost {
    _id: string,
    title: string,
    content: string,
    user: User,
    createdAt: string
}

export type LikeType = "like" | "dislike"

export interface Like {
    user: string,
    type: LikeType,
    post: string
}

export interface PopulatedLike {
    user: User,
    type: LikeType,
    post: string
}