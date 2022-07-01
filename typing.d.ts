type Vote = {
    id: number
    post_id: number
    upvote: string
    username: string
    created_at: string
}

type Comment = {
    id: number
    post_id: number
    text: string
    username: string
    created_at: string
}

type Subreddit = {
    id: number
    topic: string
    created_at: string
}

type Post = {
    id: number
    subreddit_id: number
    body: string
    image: string
    title: string
    username: string
    created_at: string
    votes: Vote[]
    comments: Comment[]
    subreddit: Subreddit[]
}