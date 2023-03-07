export interface User {
    username: string,
    id: string
}

export interface Post {
    title: string,
    content: string,
    user: string,
    createdAt?: string
}

export interface PopulatedPost {
    title: string,
    content: string,
    user: User,
    createdAt: string
}