import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmpsRestant',
})
export class TmpsRestantPipe implements PipeTransform {
  transform(value: number, ...args: string[]): string {
    const temps_anual = 5493600;
    const temps_setmanal = 135000;
    const temps_extra = 226800;
    let hh: string | number = 0;
    let mm: string | number = 0;
    let ss = 0;
    if (args[0] == 'S') {
      ss = temps_setmanal - value;
    }
    if (args[0] == 'A') {
      ss = temps_anual - value;
    }
    if (args[0] == 'E') {
      ss = temps_extra - value;
    }
    if (args[0] == 'C') {
      ss = value;
    }
    hh = Math.floor(ss / 3600);
    mm = Math.floor((ss % 3600) / 60);
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    return hh + ':' + mm;
  }
}
