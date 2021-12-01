import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];
  currentPage: number;

  constructor() { }

  ngOnChanges(): void {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.currentPage = 1;
    this.onPageChange.emit(1);
  }

  /**
   * Count number of pages that will be displayed.
   */
  getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  /**
   * Get list of pages that will be displayed.
   * @param pageCount 
   */
  getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for(let i=1; i<=pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  /**
   * Emit number of selected page.
   * @param pageNumber 
   */
  onClickPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.currentPage = pageNumber;
      this.onPageChange.emit(this.currentPage);
    }
  }
}
