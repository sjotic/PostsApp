import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  postId: number;
  usersList: User[];
  subscription: Subscription;

  constructor(
    private _postsService: PostsService, 
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['id'];
      }
    );

    await this.getSelectedPost(this.postId);
    await this.getCommentsForPost(this.postId);
    await this.getUserDetails();
  }

  /**
   * Method to get selected post.
   * @param postId 
   */
  async getSelectedPost(postId: number): Promise<void> {
    this.post = await this._postsService.getPost(postId);
  }

  /**
   * Method to get all comments for selected post.
   * @param postId 
   */
  async getCommentsForPost(postId: number): Promise<void> {
    this.post.comments = await this._postsService.getPostComments(postId);
  }

  /**
   * Method to get list of users and extract username and fullname for post owner.
   */
  async getUserDetails(): Promise<void> {
    this.usersList = await this._postsService.getUsersList();
    
    for(const user of this.usersList) {
      if (this.post.userId === user.id) {
        this.post.username = user.username;
        this.post.userFullname = user.name;
        break;
      }
    }
  }

  /**
   * Method for back button - to return on the list of posts.
   */
  goBack() {
    this.router.navigate(["/posts"]);
  }

}
