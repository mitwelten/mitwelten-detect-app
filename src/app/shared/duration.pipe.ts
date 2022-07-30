import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const h = String(Math.floor(value / 3600)).padStart(2, '0');
    const m = String(Math.floor((value % 3600) / 60)).padStart(2, '0');
    const s = String(Math.floor(value % 60)).padStart(2, '0');
    const ms = String(Math.floor((value % 1) * 1000)).padStart(3, '0');
    return `${h}:${m}:${s}.${ms}`;
  }

}
