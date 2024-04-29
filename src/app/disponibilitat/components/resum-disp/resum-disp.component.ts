import { Component, numberAttribute } from "@angular/core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Observable } from "rxjs";
import { TipusFestiuPipe } from "src/app/festius/pipes/tipus-festiu.pipe";
import { PeriodeDisponible } from "../../models/periode-disponible.dto";
import { DisponibleService } from "../../services/disponible.service";

@Component({
  selector: "app-resum-disp",
  templateUrl: "./resum-disp.component.html",
  styleUrls: ["./resum-disp.component.css"],
})
export class ResumDispComponent {
  faTrashCan = faTrashCan;
  public today = new Date();
  public llista_periodes$: Observable<PeriodeDisponible[]> = new Observable<
    PeriodeDisponible[]
  >();
  public disponibilitats: any[];
  public percentatges: {
    data: string;
    total: number;
    mati: number;
    vesp: number;
    percent_mati: number;
    percent_vesp: number;
  }[];
  constructor(private periodeDisponibleService: DisponibleService) {
    this.disponibilitats = [];
    this.percentatges = [];
  }

  ngOnInit() {
    this.llista_periodes$ =
      this.periodeDisponibleService.getPeriodeDisponibleByYear(
        this.today.getFullYear()
      );
    this.dies_quedables();
    console.log(this.percentatges);
    this.periodeDisponibleService.submitEvent.subscribe(() => {
      location.reload();
    });
  }
  esborra(id: string): void {
    this.periodeDisponibleService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
        location.reload();
      }
    });
  }
  dies_quedables() {
    this.llista_periodes$.subscribe((periodes) => {
      periodes.forEach((periode) => {
        const data = new Date(periode.data_ini).toISOString().split("T")[0];
        const tipus = periode.motiu;
        const existeixIndex = this.disponibilitats.findIndex(
          (group) => group.data === data
        );
        if (existeixIndex !== -1) {
          //Existeix data
          const existeixOpcioIndex = this.disponibilitats[
            existeixIndex
          ].opcions.findIndex((opc: any) => opc.tipus == tipus);
          console.log(existeixOpcioIndex);
          if (existeixOpcioIndex !== -1) {
            //Existeix el tipus
            this.disponibilitats[existeixIndex].opcions[existeixOpcioIndex]
              .num++;
          } else {
            this.disponibilitats[existeixIndex].opcions.push({
              tipus: tipus,
              num: 1,
            });
          }
        } else {
          this.disponibilitats.push({
            data: data,
            opcions: [{ tipus: tipus, num: 1 }],
          });
        }
      });
    });
    this.calcula_percentatge();
  }

  calcula_percentatge() {
    this.disponibilitats.forEach((periode) => {
      let total = 0;
      let mati = 0;
      let vesp = 0;
      let percent_m = 0;
      let percent_v = 0;
      periode.opcions.forEach((opcio: any) => {
        if (opcio.tipus === "11") {
          total = total + opcio.num;
        } else if (opcio.tipus === "12") {
          mati = mati + opcio.num + total;
          if (mati == 3) percent_m = 100;
          if (mati == 2) percent_m = 50;
          if (mati == 1) percent_m = 0;
        } else if (opcio.tipus === "13") {
          vesp = vesp + opcio.num + total;
          if (vesp == 3) percent_v = 100;
          if (vesp == 2) percent_v = 50;
          if (vesp == 1) percent_v = 0;
        }
      });

      this.percentatges.push({
        data: periode.data,
        total: total,
        mati: mati,
        vesp: vesp,
        percent_mati: percent_m,
        percent_vesp: percent_v,
      });
    });
    console.log(this.percentatges);
  }
}
