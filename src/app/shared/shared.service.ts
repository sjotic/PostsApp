import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private collectionSize = new BehaviorSubject<number>(0);
  currentColectionSize = this.collectionSize.asObservable();

  constructor() { }

  /**
   * Set current collection size (total page size for pagination).
   * @param size 
   */
  changeCollectionSize(size: number) {
    this.collectionSize.next(size);
  }
}
