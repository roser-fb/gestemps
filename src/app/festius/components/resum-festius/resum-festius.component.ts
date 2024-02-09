import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { PeriodeFestius } from "src/app/festius/models/periode-festius.dto";
import { PeriodeFestiusService } from "src/app/festius/services/periode-festius.service";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
  constructor(private periodeFestiusService: PeriodeFestiusService) {}

  ngOnInit() {
    this.llista_festius$ = this.periodeFestiusService.getPeriodeFestius();
    this.periodeFestiusService.submitEvent.subscribe(() => {
      location.reload();
    });
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
    this.periodeFestiusService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
        location.reload();
      }
    });
  }
}
