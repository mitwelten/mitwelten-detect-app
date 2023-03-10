import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataService } from 'src/app/shared/data.service';
import { QueueListDataSource, QueueListItem } from './queue-list-datasource';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<QueueListItem>;
  dataSource: QueueListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['node_label', 'count', 'size', 'inferrence_state', 'actions'];

  constructor(private dataService: DataService) {
    this.dataSource = new QueueListDataSource(dataService);
  }

  ngOnInit(): void {
    this.dataService.getProgress();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  queue(node_label?: string) {
    this.dataService.queueTasks(node_label).subscribe();
  }

  reset_failed(node_label?: string) {
    this.dataService.resetFailedTasks(node_label).subscribe();
  }

  reset_all(node_label?: string) {
    console.warn('not implemented, too dangerous :)');
  }

  pause(node_label?: string) {
    this.dataService.pauseTasks(node_label).subscribe();
  }

  resume(node_label?: string) {
    this.dataService.resumeTasks(node_label).subscribe();
  }

  detail(node_label: string) {
    this.dataService.getDetail(node_label);
  }

}
