import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit, OnDestroy {

  private timer: Subscription | undefined
  progressList: {id:number, percent:number, complete:number, pending:number}[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.timer = interval(2 * 1000).subscribe(() => this.dataService.getProgress());

    this.dataService.progressData.subscribe(pl => {
      this.progressList = []
      for (const p of Object.entries(pl)) {
        if (p[1]['complete'] < p[1]['total_count']) {
          this.progressList.push({
            id: p[1]['node_label'],
            percent: p[1]['complete'] / (p[1]['total_count']) * 100,
            complete: p[1]['complete'],
            pending: p[1]['total_pending']
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.timer?.unsubscribe();
  }

}
