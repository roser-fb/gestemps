import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSetmana'
})
export class DiaSetmanaPipe implements PipeTransform {

  transform(value: Date, ): string {
    let res: string = '';
    const dia: number = new Date(value).getDay();
    switch (dia) {
      case 0:
        res = "D"; 
        break;
      case 1:
        res = "Dll"; 
        break;
      case 2:
        res = "Dm"; 
        break;
      case 3:
        res = "Dx"; 
        break;
      case 4:
        res = "Dj";
        break;
      case 5:
        res = "Dv"; 
        break;
      case 6:
        res = "Ds"; 
        break;
    }
    return res;
  }
}
