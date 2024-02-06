import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipusFestiu'
})
export class TipusFestiuPipe implements PipeTransform {

  transform(tipus: string): string {
    let res = '';
    let a = parseInt(tipus);
    switch (a) {
      case 3:
        res = "Nadal/Reis"; //ROIG
        break;
      case 4:
        res = "Pascua"; //VERD
        break;
      case 5:
        res = "Festiu Nacional"; //BLAU
        break;
      case 6:
        res = "Festiu Autonòmic"; //TARONJA
        break;
      case 7:
        res = "Festiu Local"; //MORAT ?
        break;
    }
    return res;
  }

}
