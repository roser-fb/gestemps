import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserStoreService } from "src/app/user/services/user-store.service";
import { Guardia } from "../models/guardies.dto";

@Injectable({
  providedIn: "root",
})
export class GuardiesService {
  private guardies: Guardia[];
  private user: string | null;
  constructor(
    private userStoreService: UserStoreService,
    private http: HttpClient
  ) {
    this.guardies = [];
    this.user = userStoreService.getUserId();
  }

  getGuardia(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>("api/guardia");
  }
  getGuardiaById(id: number): Observable<Guardia | undefined> {
    return this.getGuardia().pipe(
      map((guardies: Guardia[]) =>
        guardies.find((guardia) => guardia.id === id)
      )
    );
  }
  getGuardiaByYear(any: number): Observable<Guardia[]> {
    return this.http.get<Guardia[]>("api/guardia/" + any);
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
    this.guardies.push(guardia);
    return this.http.post("api/guardia", guardia);
  }

  delete(id: number): Observable<any> {
    return this.http.get<any>("api/guardia/delete/" + id);
  }

  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  triggerSubmitEvent() {
    this.submitEvent.emit();
  }
}
