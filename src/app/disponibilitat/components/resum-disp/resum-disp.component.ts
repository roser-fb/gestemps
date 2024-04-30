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
  public disponibilitats: any[] = [];
  public percentatges: {
    data: string;
    total: number;
    mati: number;
    vesp: number;
  }[] = [];
  constructor(private periodeDisponibleService: DisponibleService) {}

  ngOnInit() {
    this.llista_periodes$ =
      this.periodeDisponibleService.getPeriodeDisponibleByYear(
        this.today.getFullYear()
      );
    this.dies_quedables(this.llista_periodes$);
    this.calcula_percentatge(this.disponibilitats);
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
  dies_quedables(llista_periodes: Observable<PeriodeDisponible[]>) {
    llista_periodes.subscribe((periodes) => {
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
  }

  calcula_percentatge(disponibilitats: any[]) {
    disponibilitats.forEach((periode) => {
      let total = 0;
      let mati = 0;
      let vesp = 0;

      periode.opcions.forEach((opcio: any) => {
        if (opcio.tipus === "11") {
          total = total + opcio.num;
        } else if (opcio.tipus === "12") {
          mati = mati + opcio.num + total;
        } else if (opcio.tipus === "13") {
          vesp = vesp + opcio.num + total;
        }
      });

      this.percentatges.push({
        data: periode.data,
        total: total,
        mati: mati,
        vesp: vesp,
      });
      console.log(this.percentatges);
    });
  }
}
