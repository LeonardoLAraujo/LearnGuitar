export type CommentObject = {
    id: number,
    post_id: number,
    user_id: number,
    response_post_user_id: number,
    text: string,
    username: string,
    photoUser: string,
    date: string,
    countLike: number
}