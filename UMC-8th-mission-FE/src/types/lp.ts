import { CommonResponse, CurserBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Likes[];
};

export type RequestUpdateLpDto = {
    lpId: number;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
};

export type RequestLpDetailDto = {
    title: string;
    content: string;
    thumbnail: string;
    tags: Tag[];
    published: boolean;
};

export type ResponseLpDto = CommonResponse<{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}>;

export type RequestLpDto = {
    lpId: number;
}

export type RequestCommentDto = {
    lpId: number;
    commentId?: number;
    content?: string;
};

export type ResponseLpListDto = CurserBasedResponse<Lp[]>;

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

export type ResponseLpDetailDto = CommonResponse<{
    id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt: string;
        updatedAt: string;
        author: Author;
        tags: Tag[];
        likes: Likes[];
}>;

export type LpComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
};

export type ResponseLpCommentListDto = CurserBasedResponse<LpComment[]>;

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;

export type ResponseCommentDto = CurserBasedResponse<{
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
}>;
