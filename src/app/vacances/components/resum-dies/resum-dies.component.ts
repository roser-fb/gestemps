import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { PeriodeVacancesService } from '../../services/periode-vacances.service';
import * as moment from 'moment';
import {
  ResumVacances,
  PeriodeVacances,
} from '../../models/periode-vacances.dto';

@Component({
  selector: 'app-resum-dies',
  templateUrl: './resum-dies.component.html',
  styleUrls: ['./resum-dies.component.css'],
})
export class ResumDiesComponent implements OnInit {
  @Input() resum: ResumVacances = {
    num_disf_vacances: 0,
    num_disf_ld: 0,
    num_sol_vacances: 0,
    num_sol_ld: 0,
  };
  faTrashCan = faTrashCan;
  public today = new Date();
  public llista_periodes$: Observable<PeriodeVacances[]> = new Observable<
    PeriodeVacances[]
  >();
  constructor(private periodeVacancesService: PeriodeVacancesService) {}

  ngOnInit() {
    this.llista_periodes$ =
      this.periodeVacancesService.getPeriodeVacancesByYear(
        this.today.getFullYear()
      );
    this.num_dies_solicitats();
    this.periodeVacancesService.submitEvent.subscribe(() => {
      location.reload();
    });
  }
  esborra(id: number): void {
    this.periodeVacancesService.delete(id).subscribe((res) => {
      if (res.status == 'ok') {
        location.reload();
      }
    });
  }
  num_dies_solicitats() {
    this.llista_periodes$.subscribe((periodes) => {
      periodes.forEach((periode) => {
        const ini_aux = moment(periode.data_ini, 'YYYY-MM-DD');
        const today = moment();
        if (this.dia_computable(periode, today, ini_aux)) {
          if (ini_aux.isAfter(today)) {
            this.dies_solicitats(periode);
            return;
          }
          this.dies_disfrutats(periode);
          return;
        }
      });
    });
  }

  dia_computable(
    periode: PeriodeVacances,
    hui: moment.Moment,
    dia: moment.Moment
  ) {
    return (
      ((periode.motiu == '1' || periode.motiu == '2') &&
        hui.year() === dia.year()) ||
      (periode.motiu == '9' && hui.year() === dia.year() - 1)
    );
  }
  dies_solicitats(periode: PeriodeVacances) {
    if (periode.motiu == '1') {
      this.resum.num_sol_vacances += periode.num_dies;
    } else {
      this.resum.num_sol_ld += periode.num_dies;
    }
  }
  dies_disfrutats(periode: PeriodeVacances) {
    if (periode.motiu == '1') {
      this.resum.num_disf_vacances += periode.num_dies;
    } else {
      this.resum.num_disf_ld += periode.num_dies;
    }
  }
}
