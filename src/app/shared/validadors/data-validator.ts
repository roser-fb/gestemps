
import { AbstractControl} from '@angular/forms'; 

export class DataValidator {
    static dataValidator(control: AbstractControl){
        const data_ini: string = control.get('data_ini')?.value;
        const data_fi: string = control.get('data_fi')?.value;
        const dataLimit = new Date('2022-12-31');
        
        let dataIni = new Date(data_ini);
        let dataFi = new Date(data_fi);

        if (dataIni instanceof Date && isNaN(dataIni.valueOf())) {
          control.get('data_ini')?.setErrors({ dataValidator: true });
        }else{
            if(dataIni.valueOf()<dataLimit.valueOf()) {
                control.get('data_ini')?.setErrors({ dataValidator: true });
            }
        }
        if(dataFi instanceof Date && isNaN(dataFi.valueOf())) {
          control.get('data_fi')?.setErrors({ dataValidator: true });
        }else{
            if(dataIni.valueOf()>dataFi.valueOf()) {
                control.get('data_fi')?.setErrors({ dataValidator: true });
            }
        }
    }
}
export class MotiuValidator {
    static motiuValidator(control: AbstractControl){
        const novalid: string[] = ['0'];
        const nom: string = control.get('motiu')?.value;
        const data_ini: Date = new Date(control.get('data_ini')?.value);

        if (novalid.includes(nom)) {
            control.get('motiu')?.setErrors({ motiuValidator: true });
        }else if(nom == '9' && ((data_ini.getMonth()+1 === 1 && data_ini.getDate()>=16 )||data_ini.getMonth()>=1)){
            control.get('motiu')?.setErrors({ motiuValidator: true });
        }
      
    }
}