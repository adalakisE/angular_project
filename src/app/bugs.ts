export interface Bugs {
    id: number;
    title: string;
    description: string;
    priority: number;
    reporter: string;
    status: string;
    updatedAt: Date;
    createdAt: Date;
    comments: Comment[];
}

export interface Comment {
    reporter: string;
    description: string;
    id: string;
}

