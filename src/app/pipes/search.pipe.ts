import { OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Subscription } from "rxjs";

import { SharedService } from "../shared/shared.service";

@Pipe({ name: 'appSearch' })
export class SearchPipe implements PipeTransform, OnInit, OnDestroy {
  searchedItems: any[];
  itemsLength: number;
  subscription: Subscription;

  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription = this._sharedService.currentColectionSize.subscribe(
      collSize => this.itemsLength = collSize
    );
  }
  
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      this._sharedService.changeCollectionSize(items.length);
      return items;
    }

    searchText = searchText.toLowerCase();

    this.searchedItems = items.filter(post => {
      return post.username.toLowerCase().includes(searchText);
    });
    this._sharedService.changeCollectionSize(this.searchedItems.length);

    return this.searchedItems;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}