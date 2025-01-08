import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PeriodeDisponible } from "../models/periode-disponible.dto";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
@Injectable({
  providedIn: "root",
})
export class DisponibleService {
  private disponible: PeriodeDisponible[];
  private user: string | null;
  constructor(
    private AuthStoreService: AuthStoreService,
    private http: HttpClient
  ) {
    this.disponible = [];
    this.user = AuthStoreService.get("user_id");
  }

  getPeriodeDisponible(): Observable<PeriodeDisponible[]> {
    return this.http.get<PeriodeDisponible[]>("/api/disponible");
  }
  getPeriodeDisponibleByUser(): Observable<PeriodeDisponible[]> {
    return this.getPeriodeDisponible().pipe(
      map((disponible: PeriodeDisponible[]) =>
        disponible.filter((periode) => periode.user === this.user)
      )
    );
  }
  getPeriodeDisponibleById(
    id: string
  ): Observable<PeriodeDisponible | undefined> {
    return this.getPeriodeDisponible().pipe(
      map((disponible: PeriodeDisponible[]) =>
        disponible.find((periode) => periode.id === id)
      )
    );
  }
  getPeriodeDisponibleByYear(year: number): Observable<PeriodeDisponible[]> {
    return this.http.get<PeriodeDisponible[]>("/api/disponible/" + year);
  }
  getPeriodeDisponibleByUserAndYear(
    year: number
  ): Observable<PeriodeDisponible[]> {
    return this.getPeriodeDisponibleByYear(year).pipe(
      map((disponible: PeriodeDisponible[]) =>
        disponible.filter((periode) => periode.user === this.user)
      )
    );
  }
  create(periode: PeriodeDisponible): Observable<any> {
    if (this.user) periode.user = this.user;

    this.disponible.push(periode);
    return this.http.post("/api/disponible", periode);
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>("/api/disponible/" + id);
  }
  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
