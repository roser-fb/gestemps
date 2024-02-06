import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodeTreball } from '../../models/periode-treball.dto';
import { FitxarService } from '../../services/fitxar.service';

@Component({
  selector: 'app-resum-fitxar',
  templateUrl: './resum-fitxar.component.html',
  styleUrls: ['./resum-fitxar.component.css'],
})
export class ResumFitxarComponent {
  public llista_periodes$: Observable<PeriodeTreball[]> = new Observable<
    PeriodeTreball[]
  >();
  public today = new Date();
  public jornadaLab = 25200;
  public temps_anual_consumit = 0;
  public temps_setmanal_consumit = 0;
  public temps_extra_consumit = 0;
  constructor(private fitxarService: FitxarService) {}
  ngOnInit() {
    this.llista_periodes$ = this.fitxarService.getPeriodeTreballByUserAndYear(
      this.today.getFullYear()
    );
    this.llista_periodes$.subscribe((periodes) => {
      periodes.forEach((periode) => {
        if (this.isSamWeek(periode)) {
          this.temps_setmanal_consumit =
            this.temps_setmanal_consumit + periode.temps;
        }
        this.temps_extra_consumit =
          this.temps_extra_consumit +
          (periode.temps - this.jornadaLab <= 0
            ? 0
            : periode.temps - this.jornadaLab);
        this.temps_anual_consumit = this.temps_anual_consumit + periode.temps;
      });
    });
    this.fitxarService.submitEvent.subscribe(() => {
      location.reload();
    });
  }
  esborra(id: number): void {
    this.fitxarService.delete(id).subscribe((res) => {
      if (res.status == 'ok') {
        location.reload();
      }
    });
  }

  isSamWeek(fitxa: PeriodeTreball) {
    const data_ini = new Date(fitxa.data_ini);
    const today = new Date();
    const iniciAny = new Date(today.getFullYear(), 0, 1);
    const milisegundosEnUnDia = 86400000; // 24 * 60 * 60 * 1000
    const diasTranscurridosDataIni = Math.floor(
      (data_ini.getTime() - iniciAny.getTime()) / milisegundosEnUnDia
    );
    const diasTranscurridosToday = Math.floor(
      (today.getTime() - iniciAny.getTime()) / milisegundosEnUnDia
    );
    const setmanaDataIni = Math.ceil(
      (diasTranscurridosDataIni + iniciAny.getDay() + 1) / 7
    );
    const setmanaToday = Math.ceil(
      (diasTranscurridosToday + iniciAny.getDay() + 1) / 7
    );
    return setmanaToday == setmanaDataIni;
  }
  aplicarFiltre(filtre: { startDate: string; endDate: string }) {
    if (!filtre.startDate) filtre.startDate = '2024-01-01';
    if (!filtre.endDate) filtre.endDate = new Date().toDateString();
    const startDate = new Date(filtre.startDate);
    const endDate = new Date(filtre.endDate);
    this.llista_periodes$ = this.fitxarService.getPeriodeDataRange(
      startDate,
      endDate
    );
  }
}
