import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() { }

  ngOnInit(): void {
  }

}
