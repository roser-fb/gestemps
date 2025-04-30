import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { PeriodeFestius } from "src/app/festius/models/periode-festius.dto";
import { PeriodeFestiusService } from "src/app/festius/services/periode-festius.service";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { PeriodeFestiusState } from "../../reducers";
import * as PeriodeFestiusAction from "../../actions";
@Component({
  selector: "app-resum-festius",
  templateUrl: "./resum-festius.component.html",
  styleUrls: ["./resum-festius.component.css"],
})
export class ResumFestiusComponent {
  faTrashCan = faTrashCan;

  public llista_festius$: Observable<PeriodeFestius[]> = new Observable<
    PeriodeFestius[]
  >();
  public llista_festius: PeriodeFestius[] = [];
  public currentDate: Date = new Date();
  constructor(private store: Store<AppState>) {
    this.llista_festius$ = this.store
      .select("periodeFestius")
      .pipe(map(({ periodes }) => periodes));
  }

  ngOnInit() {
    this.store.dispatch(
      PeriodeFestiusAction.getPeriodesFestius()
    );
  }
  proximsFestius(data: Date): boolean {
    const sisMesos = new Date();
    const current: number = this.currentDate.getTime();
    const mesActual: number = this.currentDate.getMonth();
    const anyActual: number = this.currentDate.getFullYear();

    let data_festiu: number = new Date(data).getTime();

    sisMesos.setMonth(mesActual + 6);
    if (sisMesos.getMonth() < mesActual) {
      sisMesos.setFullYear(anyActual + 1);
    }

    if (data_festiu > current && data_festiu < sisMesos.getTime()) {
      return true;
    }

    return false;
  }

  fullYear(data: Date, num: number): boolean {
    const year: number = this.currentDate.getFullYear() + num;
    const nextYear: number = year + 1;

    const timeYear: number = new Date("01/01/" + year.toString()).getTime();
    const timeNextYear: number = new Date(
      "01/01/" + nextYear.toString()
    ).getTime();

    let data_Date: string = new Date(data).toLocaleDateString("en-US");
    let data_festiu: number = new Date(data_Date).getTime();

    if (data_festiu >= timeYear && data_festiu < timeNextYear) {
      return true;
    }

    return false;
  }

  esborra(id: string): void {
    this.store.dispatch(
      PeriodeFestiusAction.deletePeriodeFestius({ id })
    );
  }
}
