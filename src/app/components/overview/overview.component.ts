import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Task Queue', id: 1, cols: 2, rows: 1 },
          { title: 'Details', id: 2, cols: 2, rows: 1 },
          { title: 'Progress', id: 3, cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Task Queue', id: 1, cols: 2, rows: 1 },
        { title: 'Details', id: 2, cols: 1, rows: 1 },
        { title: 'Progress', id: 3, cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
