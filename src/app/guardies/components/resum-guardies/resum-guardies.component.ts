import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Guardia, ResumGuardies } from '../../models/guardies.dto';
import { GuardiesService } from '../../services/guardies.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resum-guardies',
  templateUrl: './resum-guardies.component.html',
  styleUrls: ['./resum-guardies.component.css'],
})
export class ResumGuardiesComponent {
  faTrashCan = faTrashCan;
  public llista_guardies$: Observable<Guardia[]> = new Observable<Guardia[]>();
  public llista_all_guardies$: Observable<Guardia[]> = new Observable<
    Guardia[]
  >();
  public resum_any_act: ResumGuardies;
  public resum_any_ant: ResumGuardies;
  public resum_mes_act: ResumGuardies;
  public resum_mes_ant: ResumGuardies;
  public today = new Date();
  constructor(private guardiesService: GuardiesService) {
    this.resum_any_act = new ResumGuardies(0, 0, 0, 0);
    this.resum_any_ant = new ResumGuardies(0, 0, 0, 0);
    this.resum_mes_act = new ResumGuardies(0, 0, 0, 0);
    this.resum_mes_ant = new ResumGuardies(0, 0, 0, 0);
  }

  ngOnInit() {
    this.llista_guardies$ = this.guardiesService.getGuardiaByUserAndYear(
      this.today.getFullYear()
    );
    this.llista_all_guardies$ = this.guardiesService.getGuardiaByUser();
    this.llista_all_guardies$.subscribe((guardies) => {
      guardies.forEach((guardia) => {
        var guardia_mes = new Date(guardia.data).getMonth() + 1;
        var guardia_any = new Date(guardia.data).getFullYear();

        if (this.any_anterior(guardia_any)) {
          this.guardia_ant_resum(guardia);
          return;
        }
        if (this.any_actual(guardia_any)) {
          this.guardia_act_resum(guardia);
          if (this.mes_anterior(guardia_mes)) {
            this.guardia_ant_mes(guardia);
          }
          if (this.mes_actual(guardia_mes)) {
            this.guardia_act_mes(guardia);
          }
          return;
        }
      });
    });
    this.guardiesService.submitEvent.subscribe(() => {
      location.reload();
    });
  }

  esborra(id: number): void {
    this.guardiesService.delete(id).subscribe((res) => {
      if (res.status == 'ok') {
        location.reload();
      }
    });
  }

  any_anterior(any: number): boolean {
    return any === this.today.getFullYear() - 1;
  }
  any_actual(any: number): boolean {
    return any === this.today.getFullYear();
  }
  mes_anterior(mes: number): boolean {
    return mes === this.today.getMonth();
  }
  mes_actual(mes: number): boolean {
    return mes === this.today.getMonth() + 1;
  }
  es_festiu(festiu: number): boolean {
    return festiu === 1;
  }

  guardia_ant_resum(guardia: Guardia): void {
    if (this.es_festiu(guardia.festiu)) {
      this.resum_any_ant.fest_dies += 1;
      this.resum_any_ant.fest_hores += guardia.n_hores;
      return;
    }
    this.resum_any_ant.lab_dies += 1;
    this.resum_any_ant.lab_hores += guardia.n_hores;
    return;
  }
  guardia_ant_mes(guardia: Guardia): void {
    if (this.es_festiu(guardia.festiu)) {
      this.resum_mes_ant.fest_dies += 1;
      this.resum_mes_ant.fest_hores += guardia.n_hores;
      return;
    }
    this.resum_mes_ant.lab_dies += 1;
    this.resum_mes_ant.lab_hores += guardia.n_hores;
    return;
  }
  guardia_act_resum(guardia: Guardia): void {
    if (this.es_festiu(guardia.festiu)) {
      this.resum_any_act.fest_dies += 1;
      this.resum_any_act.fest_hores += guardia.n_hores;
      return;
    }
    this.resum_any_act.lab_dies += 1;
    this.resum_any_act.lab_hores += guardia.n_hores;
    return;
  }
  guardia_act_mes(guardia: Guardia): void {
    if (this.es_festiu(guardia.festiu)) {
      this.resum_mes_act.fest_dies += 1;
      this.resum_mes_act.fest_hores += guardia.n_hores;
      return;
    }
    this.resum_mes_act.lab_dies += 1;
    this.resum_mes_act.lab_hores += guardia.n_hores;
    return;
  }
}
