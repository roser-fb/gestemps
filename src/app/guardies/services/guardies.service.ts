import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { Guardia } from "../models/guardies.dto";

@Injectable({
  providedIn: "root",
})
export class GuardiesService {
  private guardies: Guardia[];
  private user: string | null;
  constructor(
    private AuthStoreService: AuthStoreService,
    private http: HttpClient
  ) {
    this.guardies = [];
    this.user = AuthStoreService.get("user_id");
  }

  getGuardia(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>("/api/guardia");
  }
  getGuardiaById(id: string): Observable<Guardia | undefined> {
    return this.getGuardia().pipe(
      map((guardies: Guardia[]) =>
        guardies.find((guardia) => guardia.id === id)
      )
    );
  }
  getGuardiaByYear(any: number): Observable<Guardia[]> {
    return this.http.get<Guardia[]>("/api/guardia/" + any);
  }
  getGuardiaByUser(): Observable<Guardia[]> {
    return this.getGuardia().pipe(
      map((guardies: Guardia[]) =>
        guardies.filter((guardia) => guardia.user === this.user)
      )
    );
  }
  getGuardiaByUserAndYear(any: number): Observable<Guardia[]> {
    return this.getGuardiaByYear(any).pipe(
      map((guardies: Guardia[]) =>
        guardies.filter((guardia) => guardia.user === this.user)
      )
    );
  }
  create(guardia: Guardia, festiu: number): Observable<any> {
    if (this.user) guardia.user = this.user;
    if (festiu == 1) {
      guardia.n_hores = 24;
    } else {
      guardia.n_hores = 17;
    }
    guardia.festiu = festiu;
    guardia.motiu = 8;
    this.guardies.push(guardia);
    return this.http.post("/api/guardia", guardia);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>("/api/guardia/" + id);
  }

  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
