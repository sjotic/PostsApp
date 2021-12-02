import { Pipe, PipeTransform } from "@angular/core";
import { Subscription } from "rxjs";

import { SharedService } from "../shared/shared.service";

@Pipe({ name: 'appSearch' })
export class SearchPipe implements PipeTransform {
  searchedItems: any[];
  subscription: Subscription;

  constructor(private _sharedService: SharedService) {}
  
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
}