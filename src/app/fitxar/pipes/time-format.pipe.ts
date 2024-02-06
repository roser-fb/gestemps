import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const hh = Math.floor(value / 3600);
    const mm = Math.floor((value % 3600) / 60);
    const ss = value % 60;
    return (
      hh.toString().padStart(2, '0') +
      ':' +
      mm.toString().padStart(2, '0') +
      ':' +
      ss.toString().padStart(2, '0')
    );
  }
}
