import { Component } from "@angular/core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { map, Observable } from "rxjs";
import { PeriodeDisponible } from "../../models/periode-disponible.dto";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import * as PeriodesDisponiblesAction from "../../actions";
@Component({
  selector: "app-resum-disp",
  templateUrl: "./resum-disp.component.html",
  styleUrls: ["./resum-disp.component.css"],
})
export class ResumDispComponent {
  faTrashCan = faTrashCan;
  llista_periodes$: Observable<PeriodeDisponible[]>;
  public today = new Date();
  public disponibilitats: any[] = [];
  public percentatges: {
    data: string;
    total: number;
    mati: number;
    vesp: number;
  }[] = [];

  constructor(private store: Store<AppState>) {
    this.llista_periodes$ = this.store
      .select("periodeDisponible")
      .pipe(map(({ periodesDisponibles }) => periodesDisponibles));
    this.dies_quedables(this.llista_periodes$);
  }

  ngOnInit() {
    this.store.dispatch(
      PeriodesDisponiblesAction.getPeriodeDisponibleByYear({
        year: this.today.getFullYear(),
      })
    );
    this.dies_quedables(this.llista_periodes$);
  }
  esborra(id: string): void {
    this.store.dispatch(
      PeriodesDisponiblesAction.deletePeriodeDisponible({ id })
    );
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
      this.calcula_percentatge(this.disponibilitats);
    });
  }

  calcula_percentatge(disponibilitats: any[]) {
    disponibilitats.forEach((periode) => {
      let total = 0;
      let mati = 0;
      let vesp = 0;
      periode.opcions.forEach((opcio: any) => {
        console.log(opcio);
        if (opcio.tipus === 11) {
          total = total + opcio.num;
          mati = mati + opcio.num;
          vesp = vesp + opcio.num;
        } else if (opcio.tipus === 12) {
          mati = mati + opcio.num;
        } else if (opcio.tipus === 13) {
          vesp = vesp + opcio.num;
        }
      });
      this.percentatges.push({
        data: periode.data,
        total: total,
        mati: mati,
        vesp: vesp,
      });
    });
  }
}
