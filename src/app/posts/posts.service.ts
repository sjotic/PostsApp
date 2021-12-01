import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) { }

  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + url, {
        observe: 'response'
      }).subscribe(data => {
        resolve(data.body);
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * Method to retrieve posts from server
   */
  getPosts(): Promise<Post[]> {
    return this.get("/posts");
  }

  /**
   * Method to retreive single post
   * @param postId
   */
  getPost(postId: number): Promise<Post> {
    return this.get("/posts/" +  postId);
  }

  /**
   * Method to retrieve comments from server
   */
  getComments(): Promise<Comment[]> {
    return this.get("/comments");
  }

  /**
   * Method to get comments for selected post
   * @param postId
   */
  getPostComments(postId: number): Promise<Comment[]> {
    return this.get("/posts/" + postId + "/comments");
  }

  /**
   * Method to retrieve list of users
   */
  getUsersList(): Promise<User[]> {
    return this.get("/users");
  }
}
