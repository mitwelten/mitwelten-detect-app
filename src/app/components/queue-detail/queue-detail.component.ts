import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

export interface DetailData {
  node_label: string;
  file_stats: {
    common_duration: number;
    min_time: string;
    max_time: string;
  };
  task_stats: {
    avg_runtime: number;
    min_runtime: number;
    max_runtime: number;
    min_scheduled_on: string;
    max_scheduled_on: string;
    min_end_on: string;
    max_end_on: string;
    total_runtime: number;
  };
  result_stats: {
    count: number;
    count_conf_09: number;
  };
}


@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.css']
})
export class QueueDetailComponent implements OnInit {

  data: DetailData | undefined;
  loading = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.detailDataLoading.subscribe(loading => this.loading = loading);
    this.dataService.detailData.subscribe((data: DetailData) => this.data = data);
  }

}
