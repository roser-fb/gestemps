import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextYear'
})
export class NextYearPipe implements PipeTransform {

  transform(value: Date): number {
    const year: number = new Date(value).getFullYear();
    return  year + 1;
  }

}
