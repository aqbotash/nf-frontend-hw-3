export interface Post{
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reaction;
    views: number;
    userId: number;
}

export interface Reaction{
    likes: number;
    dislikes: number;
}