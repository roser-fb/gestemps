import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of, throwError } from "rxjs";
import { PeriodeVacances } from "../models/periode-vacances.dto";
import { UserStoreService } from "src/app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class PeriodeVacancesService {
  private periodes: PeriodeVacances[];
  private user: string | null;
  constructor(
    private userStoreService: UserStoreService,
    private http: HttpClient
  ) {
    this.periodes = [];
    this.user = userStoreService.getUserId();
  }

  getPeriodeVacances(): Observable<PeriodeVacances[]> {
    return this.http.get<PeriodeVacances[]>("/api/periodes");
  }
  getPeriodeVacancesByUser(): Observable<PeriodeVacances[]> {
    return this.getPeriodeVacances().pipe(
      map((periodes: PeriodeVacances[]) =>
        periodes.filter((periode) => periode.user === this.user)
      )
    );
  }
  getPeriodeVacancesById(id: string): Observable<PeriodeVacances | undefined> {
    return this.getPeriodeVacances().pipe(
      map((periodes: PeriodeVacances[]) =>
        periodes.find((periode) => periode.id === id)
      )
    );
  }
  getPeriodeVacancesByYear(year: number): Observable<PeriodeVacances[]> {
    return this.http.get<PeriodeVacances[]>("/api/periodes/" + year);
  }
  getPeriodeVacancesByUserAndYear(year: number): Observable<PeriodeVacances[]> {
    return this.getPeriodeVacancesByYear(year).pipe(
      map((periodes: PeriodeVacances[]) =>
        periodes.filter((periode) => periode.user === this.user)
      )
    );
  }
  create(periode: PeriodeVacances, num_dies: number): Observable<any> {
    if (this.user) periode.user = this.user;
    periode.num_dies = num_dies;

    this.periodes.push(periode);
    return this.http.post("/api/periodes", periode);
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>("/api/periodes/" + id);
  }
  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
