import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

export interface QueueListItem {
  node_label: string;
  size: number;
  total_count: number;
  total_pending: number;
  noqueue: number;
  pending: number;
  running: number;
  complete: number;
  failed: number;
  paused: number;
}

/**
 * Data source for the InputList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QueueListDataSource extends DataSource<QueueListItem> {
  data: QueueListItem[] | [] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private dataService: DataService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<QueueListItem[]> {


    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.dataService.progressData.pipe(map((data: any) => {
        // console.log(data);

        this.data = data;
      })), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: QueueListItem[]): QueueListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: QueueListItem[]): QueueListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'node_label': return compare(a.node_label, b.node_label, isAsc);
        case 'count': return compare(+a.total_count, +b.total_count, isAsc);
        case 'size': return compare(+a.size, +b.size, isAsc);
        case 'inferrence_state': return compare(a.complete/a.total_count, b.complete/b.total_count, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
