import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Guardia, ResumGuardies } from "../../models/guardies.dto";
import { GuardiesService } from "../../services/guardies.service";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-resum-guardies",
  templateUrl: "./resum-guardies.component.html",
  styleUrls: ["./resum-guardies.component.css"],
})
export class ResumGuardiesComponent {
  faTrashCan = faTrashCan;
  public llista_guardies$: Observable<Guardia[]> = new Observable<Guardia[]>();
  public llista_all_guardies$: Observable<Guardia[]> = new Observable<
    Guardia[]
  >();
  public detall_any_act: ResumGuardies[] | undefined;
  public detall_any_ant: ResumGuardies[] | undefined;
  public resum_any_act: ResumGuardies | undefined;
  public resum_any_ant: ResumGuardies | undefined;
  public resum_mes_act: ResumGuardies | undefined;
  public resum_mes_ant: ResumGuardies | undefined;
  public today = new Date();
  resumGuardiesMes: ResumGuardies[] = [];
  lab_preu: number = 6.165;
  fest_preu: number = 6.915;
  constructor(private guardiesService: GuardiesService) {
    this.detall_any_act = [];
    this.detall_any_ant = [];
    this.resum_any_act = new ResumGuardies("", 0, 0, 0, 0, 0);
    this.resum_any_ant = new ResumGuardies("", 0, 0, 0, 0, 0);
    this.resum_mes_act = new ResumGuardies("", 0, 0, 0, 0, 0);
    this.resum_mes_ant = new ResumGuardies("", 0, 0, 0, 0, 0);
  }

  ngOnInit() {
    this.llista_guardies$ = this.guardiesService.getGuardiaByUserAndYear(
      this.today.getFullYear()
    );
    this.llista_all_guardies$ = this.guardiesService.getGuardiaByUser();
    this.llista_all_guardies$.subscribe((guardies) => {
      guardies.forEach((guardia) => {
        this.processaGuardia(guardia);
      });
      this.guardiesService.submitEvent.subscribe(() => {
        location.reload();
      });
    });
  }
  processaGuardia(guardia: Guardia) {
    const grouped = new Map<string, ResumGuardies>();
    var guardia_mes = new Date(guardia.data).getMonth() + 1;
    var guardia_any = new Date(guardia.data).getFullYear();
    var mes = guardia_mes + "/" + guardia_any;

    if (!grouped.has(mes)) {
      grouped.set(mes, {
        mes: "",
        lab_dies: 0,
        lab_hores: 0,
        fest_dies: 0,
        fest_hores: 0,
        preu: 0,
      });
    }
    const group = grouped.get(mes)!;
    if (guardia.festiu === 1) {
      group.fest_dies += 1;
      group.fest_hores += guardia.n_hores;
    } else {
      group.lab_dies += 1;
      group.lab_hores += guardia.n_hores;
    }

    this.resumGuardiesMes = Array.from(grouped.entries()).map(
      ([mes, hores]) => {
        const lab_dies = hores.lab_dies;
        const fest_dies = hores.fest_dies;
        const lab_hores = hores.lab_hores;
        const fest_hores = hores.fest_hores;
        const preu =
          hores.fest_hores * this.fest_preu + hores.lab_hores * this.lab_preu;
        return { mes, lab_dies, lab_hores, fest_dies, fest_hores, preu };
      }
    );

    this.resumGuardiesMes.sort((a, b) => {
      const [monthA, yearA] = a.mes.split("/").map(Number);
      const [monthB, yearB] = b.mes.split("/").map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });
    this.calculaResumMes();
    this.calculaResumAny();
  }
  calculaResumMes() {
    this.resum_mes_act = this.resumGuardiesMes.find(
      (resum) =>
        resum.mes === `${this.today.getMonth()}/${this.today.getFullYear()}`
    );
    this.resum_mes_ant = this.resumGuardiesMes.find(
      (resum) =>
        resum.mes === `${this.today.getMonth()}/${this.today.getFullYear()}`
    );
  }
  calculaResumAny() {
    this.detall_any_act = this.resumGuardiesMes.filter((resum) =>
      resum.mes.includes(`${this.today.getFullYear()}`)
    );
    this.resum_any_act = this.detall_any_act.reduce(
      (acc, item) => {
        acc.lab_hores += item.lab_hores;
        acc.fest_dies += item.fest_dies;
        acc.fest_hores += item.fest_hores;
        acc.preu += item.preu;
        return acc;
      },
      {
        mes: `${this.today.getFullYear()}`,
        lab_hores: 0,
        fest_dies: 0,
        fest_hores: 0,
        preu: 0,
      } as ResumGuardies
    );

    this.detall_any_ant = this.resumGuardiesMes.filter((resum) =>
      resum.mes.includes(`${this.today.getFullYear() - 1}`)
    );

    this.resum_any_ant = this.detall_any_ant.reduce(
      (acc, item) => {
        acc.lab_hores += item.lab_hores;
        acc.fest_dies += item.fest_dies;
        acc.fest_hores += item.fest_hores;
        acc.preu += item.preu;
        return acc;
      },
      {
        mes: `${this.today.getFullYear() - 1}`,
        lab_hores: 0,
        fest_dies: 0,
        fest_hores: 0,
        preu: 0,
      } as ResumGuardies
    );
  }
  esborra(id: string): void {
    this.guardiesService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
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
}
