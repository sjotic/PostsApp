import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Post } from "../../models/post.model";
import { Comment } from "../../models/comment.model";
import { User } from "../../models/user.model";
import { PostsService } from "../posts.service";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[];
  comments: Comment[];
  usersList: User[];

  searchText: string = "";
  isLoading: boolean = false;
  activePage: number = 0;
  postsPerPage: number = 10;
  totalPosts: number = 0;
  subscription: Subscription;

  constructor(
    private _postsService: PostsService,
    private _sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.mergePostsAndComments();
    this.route.queryParams.subscribe((params: Params) => {
      if (!params?.page || Object.keys(params).length === 0) {
        this.activePage = 1;
      } else if (params.page) {
        this.activePage = +params.page;
      }
    });
    this.subscription = this._sharedService.currentColectionSize.subscribe(
      (collSize) => {
        this.totalPosts = collSize;
      }
    );
  }

  /**
   * Load data from server.
   */
  async loadData(): Promise<void> {
    this.isLoading = true;

    this.posts = await this._postsService.getPosts();
    this.comments = await this._postsService.getComments();
    this.usersList = await this._postsService.getUsersList();

    this.isLoading = false;
  }

  /**
   * Method to connect posts with their comments.
   * Add username and fullname for the post.
   */
  mergePostsAndComments() {
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].comments = [];

      for (const comment of this.comments) {
        if (this.posts[i].id === comment.postId) {
          this.posts[i].comments.push(comment);
        }
      }

      for (const user of this.usersList) {
        if (this.posts[i].userId === user.id) {
          this.posts[i].username = user.username;
          this.posts[i].userFullname = user.name;
        }
      }
    }
  }

  /**
   * Set active page number to query param.
   * @param activePageNumber 
   */
  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.activePage !== 1 ? { page: this.activePage } : {},
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
