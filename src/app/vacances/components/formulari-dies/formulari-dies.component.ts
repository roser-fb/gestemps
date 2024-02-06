
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataValidator, MotiuValidator } from '../../../shared/validadors/data-validator';
import { PeriodeVacancesService } from '../../services/periode-vacances.service';
import * as moment from 'moment';

@Component({
  selector: 'app-formulari-dies',
  templateUrl: './formulari-dies.component.html',
  styleUrls: ['./formulari-dies.component.css']
})
export class FormulariDiesComponent {
  public periodeForm!: FormGroup; 
  public num_dies:number = 0;
  public submitted = false;
  public message = null;
  constructor(private formbuilder: FormBuilder, private periodeVacancesService: PeriodeVacancesService) {
    this.creaFormulari();
  }
  creaFormulari(){
    this.periodeForm = this.formbuilder.group({
      data_ini:[new Date, Validators.required],  
      data_fi:[new Date,Validators.required],
      motiu:[0, Validators.required]
    },{
      validator: [DataValidator.dataValidator, MotiuValidator.motiuValidator]
    }
    );
  }

  onSubmit() { 
    this.submitted=true;
    if(this.periodeForm.valid){ 

      this.num_dies=this.calculaDies(this.periodeForm.value.data_ini,this.periodeForm.value.data_fi);

      this.periodeVacancesService.create(this.periodeForm.value, this.num_dies).subscribe((result: any) => {
        this.message = result.msg;
        this.creaFormulari();
        this.periodeVacancesService.triggerSubmitEvent();
      }, (err) => {
        this.message = err.error.msg;
      });  
    }else{
      console.log("El formulari és invàlid");
    }
  }

  calculaDies(ini:Date, fi:Date): number{
    var from = moment(ini, 'YYYY-MM-DD'),
    to = moment(fi, 'YYYY-MM-DD'),
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
