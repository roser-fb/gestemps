import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserStoreService } from "src/app/user/services/user-store.service";
import { PeriodeTreball } from "../models/periode-treball.dto";

@Injectable({
  providedIn: "root",
})
export class FitxarService {
  private user: string | null;
  constructor(
    private userStoreService: UserStoreService,
    private http: HttpClient
  ) {
    this.user = userStoreService.getUserId();
  }
  getPeriodeTreball(): Observable<PeriodeTreball[]> {
    return this.http.get<PeriodeTreball[]>("/api/fitxar");
  }
  getPeriodeTreballByYear(year: number): Observable<PeriodeTreball[]> {
    return this.http.get<PeriodeTreball[]>("/api/fitxar/" + year);
  }
  getPeriodeTreballByUserAndYear(year: number): Observable<PeriodeTreball[]> {
    return this.getPeriodeTreballByYear(year).pipe(
      map((periodes: PeriodeTreball[]) =>
        periodes.filter((periode) => periode.user === this.user)
      )
    );
  }

  getPeriodeDataRange(ini: Date, fi: Date): Observable<PeriodeTreball[]> {
    return this.getPeriodeTreball().pipe(
      map((periodes: PeriodeTreball[]) =>
        periodes.filter(
          (periode) =>
            periode.user === this.user &&
            new Date(periode.data_ini) >= ini &&
            new Date(periode.data_fi) <= fi
        )
      )
    );
  }
  create(periode: PeriodeTreball): Observable<any> {
    if (this.user) periode.user = this.user;
    return this.http.post("/api/fitxar", periode);
  }
  update(periode: PeriodeTreball): Observable<any> {
    if (this.user) periode.user = this.user;
    return this.http.patch("/api/fitxar/" + periode.id, periode);
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>("/api/fitxar/" + id);
  }
  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
