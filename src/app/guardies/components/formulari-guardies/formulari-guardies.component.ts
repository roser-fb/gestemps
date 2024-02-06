import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import * as moment from 'moment';
import { PeriodeFestiusService } from 'src/app/festius/services/periode-festius.service';
import { GuardiesService } from '../../services/guardies.service';

@Component({
  selector: 'app-formulari-guardies',
  templateUrl: './formulari-guardies.component.html',
  styleUrls: ['./formulari-guardies.component.css'],
})
export class FormulariGuardiesComponent {
  guardiesForm!: FormGroup;
  data: FormControl;
  festiu: number = 0;
  submitted = false;
  message = null;
  constructor(
    private formBuilder: FormBuilder,
    private guardiesService: GuardiesService,
    private periodeFestiusService: PeriodeFestiusService
  ) {
    this.data = new FormControl(new Date(), Validators.required);
    this.creaFormulari();
  }
  creaFormulari() {
    this.guardiesForm = this.formBuilder.group({
      data: this.data,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.guardiesForm.valid) {
      this.calculaFestiu(this.guardiesForm.value.data);

      this.guardiesService
        .create(this.guardiesForm.value, this.festiu)
        .subscribe(
          (result: any) => {
            this.message = result.msg;
            this.creaFormulari();
            this.guardiesService.triggerSubmitEvent();
          },
          (err) => {
            this.message = err.error.msg;
          }
        );
    } else {
      console.log('El formulari és invàlid');
    }
  }

  calculaFestiu(ini: Date): void {
    const dia = moment(ini, 'YYY-MM-DD');
    if (dia.isValid()) {
      // Si no dissabte ni diumenge
      if (dia.isoWeekday() == 6 || dia.isoWeekday() == 7) {
        this.festiu = 1;
        return;
      } else {
        this.periodeFestiusService
          .getPeriodeFestiusByDate(this.guardiesForm.value.data)
          .subscribe((x) => {
            if (x !== undefined && this.festiu == 0) {
              this.festiu = 1;
              return;
            }
          });
      }
    }
    return;
  }
}
