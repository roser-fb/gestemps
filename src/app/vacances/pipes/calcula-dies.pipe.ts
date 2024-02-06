import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'calculaDies'
})
export class CalculaDiesPipe implements PipeTransform {

  transform(data_ini: Date, data_fi: Date): number {
    var from = moment(data_ini, 'DD/MM/YYY'),
    to = moment(data_fi, 'DD/MM/YYY'),
    days = 0;
    while (!from.isAfter(to)) {
      // Si no dissabte ni diumenge
      if (from.isoWeekday() !== 6 && from.isoWeekday() !== 7) {
        days++;
      }
      from.add(1, 'days');
    }
    return days;
  }
}
