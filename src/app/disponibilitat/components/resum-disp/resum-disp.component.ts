import { Component } from "@angular/core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Observable } from "rxjs";
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
  constructor(private periodeDisponibleService: DisponibleService) {}

  ngOnInit() {
    this.llista_periodes$ =
      this.periodeDisponibleService.getPeriodeDisponibleByYear(
        this.today.getFullYear()
      );
    this.dies_quedables();
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
      console.log(periodes);
      periodes.forEach((periode) => {
        const data = new Date(periode.data_ini).toISOString().split("T")[0];
        const tipus = periode.motiu;
        console.log(data);
        console.log(tipus);
        const existingGroupIndex = this.disponibilitats.findIndex(
          (group) => group.data === data
        );

        if (existingGroupIndex !== -1) {
          const existingOpcioIndex = this.disponibilitats[
            existingGroupIndex
          ].opcions.findIndex(
            (opc: any) => opc.tipus == tipus || opc.tipus == 12
          );
          if (existingOpcioIndex !== -1) {
            this.disponibilitats[existingGroupIndex].opcions[existingOpcioIndex]
              .num++;
          } else {
            this.disponibilitats[existingGroupIndex].opcions.push({
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
        console.log(this.disponibilitats);
      });
    });
  }
}
