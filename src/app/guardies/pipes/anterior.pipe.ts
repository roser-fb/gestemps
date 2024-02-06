import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anterior',
})
export class AnteriorPipe implements PipeTransform {
  transform(value: Date, ...args: number[]): unknown {
    let mm: number;
    let yyyy: number;
    let newFormat: string = '';

    let dateTransform = new Date(value);
    let type: number = args[0];

    mm = dateTransform.getMonth();
    yyyy = dateTransform.getFullYear() - 1;

    if (type === 1) {
      newFormat = '' + mm;
    }
    if (type === 2) {
      newFormat = '' + yyyy;
    }

    return newFormat;
  }
}
