import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PeriodeFestius } from "../models/periode-festius.dto";

@Injectable({
  providedIn: "root",
})
export class PeriodeFestiusService {
  private periodes: PeriodeFestius[];
  constructor(private http: HttpClient) {
    this.periodes = [];
  }

  getPeriodeFestius(): Observable<PeriodeFestius[]> {
    return this.http.get<PeriodeFestius[]>("/api/festius").pipe(
      map((data: PeriodeFestius[]) => {
        const festiusModificats: PeriodeFestius[] = [];
        const currentYear: number = new Date().getFullYear();
        for (const festiu of data) {
          let nextFestiu: PeriodeFestius = new PeriodeFestius(
            0,
            new Date(),
            "0",
            0
          );
          const currentData = new Date(festiu.data_ini);
          if (festiu.fix == 1) {
            //Festiu d'aquest any
            currentData.setFullYear(currentYear);
            festiu.data_ini = currentData;
            festiu.id = festiu.id + currentYear;
            festiusModificats.push(festiu);

            //Festiu d'any següent
            const nextData = new Date(festiu.data_ini);
            nextData.setFullYear(currentYear + 1);
            nextFestiu.data_ini = nextData;
            nextFestiu.id = festiu.id + (currentYear + 1);
            nextFestiu.motiu = festiu.motiu;
            nextFestiu.fix = festiu.fix;
            festiusModificats.push(nextFestiu);
          } else {
            festiu.data_ini = currentData;
            festiusModificats.push(festiu);
          }
        }
        festiusModificats.sort(function (a, b) {
          var da = new Date(a.data_ini).getTime();
          var db = new Date(b.data_ini).getTime();

          return da - db;
        });
        return festiusModificats;
      })
    );
  }
  getPeriodeFestiusById(id: number): Observable<PeriodeFestius | undefined> {
    return this.getPeriodeFestius().pipe(
      map((periodes: PeriodeFestius[]) =>
        periodes.find((periode) => periode.id === id)
      )
    );
  }
  getPeriodeFestiusByDate(data: Date): Observable<PeriodeFestius | undefined> {
    let datePipe: DatePipe = new DatePipe("en-US");
    return this.getPeriodeFestius().pipe(
      map((periodes: PeriodeFestius[]) => {
        return periodes.find((periode) => {
          return (
            datePipe.transform(periode.data_ini, "shortDate") ===
            datePipe.transform(data, "shortDate")
          );
        });
      })
    );
  }

  create(periode: PeriodeFestius): Observable<any> {
    this.periodes.push(periode);
    return this.http.post("/api/festius", periode);
  }

  delete(id: string): Observable<any> {
    return this.http.get<any>("/api/festius/delete/" + id);
  }

  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
