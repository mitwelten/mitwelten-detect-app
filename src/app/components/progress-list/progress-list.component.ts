import { Component, OnInit } from '@angular/core';
import { interval, mergeMap, Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {

  progressList: {id:number, percent:number, complete:number, pending:number}[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    interval(2 * 1000).pipe(
      mergeMap(() => this.dataService.getProgress())
    ).subscribe(pl => {
      this.progressList = []
      for (const p of Object.entries(pl)) {
        this.progressList.push({
          id: +p[0],
          percent: p[1]['complete']/ (p[1]['complete'] + p[1]['pending']) * 100,
          complete: p[1]['complete'],
          pending: p[1]['pending']
        })
      }
    });
  }
}
