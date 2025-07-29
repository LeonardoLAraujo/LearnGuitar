import { Comment } from "../model/comment";
import { Post } from "../model/post";

export class Util {
    public static sort: number = 1;
    
     public static alterPositionArray(posts: Array<Post>) {
        this.sort = 1;
        this.sort *= -1;
  
        posts = [...posts.sort((a: Post, b: Post) =>
          this.sort * a.getDate().localeCompare(b.getDate()))];
        
        return posts;
    }

    public static alterPositionArrayComment(comment: Array<Comment>) {
        this.sort = 1;
        this.sort *= -1;
  
        comment = [...comment.sort((a: Comment, b: Comment) =>
                this.sort * a.getDate().localeCompare(b.getDate()))];
        
        return comment;
    }
}