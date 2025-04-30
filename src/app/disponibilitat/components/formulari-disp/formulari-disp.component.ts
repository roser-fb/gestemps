import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  DataValidator,
  MotiuValidator,
} from "../../../shared/validadors/data-validator";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Observable, map } from "rxjs";
import { AuthState } from "src/app/auth/reducers";
import * as PeriodeDisponibleAction from "../../actions";

@Component({
  selector: "app-formulari-disp",
  templateUrl: "./formulari-disp.component.html",
  styleUrls: ["./formulari-disp.component.css"],
})
export class FormulariDispComponent {
  public disponibleForm!: FormGroup;
  public num_dies: number = 0;
  public submitted = false;
  public message = null;
  public auth_estat$: Observable<AuthState>;

  periode$ = this.store
    .select("periodeDisponible")
    .pipe(map(({ periodeDisponible }) => periodeDisponible));

  responseOK$: Observable<boolean | null> = this.store
    .select("periodeDisponible")
    .pipe(map(({ responseOK }) => responseOK));

  error$: Observable<any> = this.store
    .select("periodeDisponible")
    .pipe(map(({ error }) => error));

  constructor(
    private formbuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.creaFormulari();
    this.auth_estat$ = this.store.select("auth");
  }
  creaFormulari() {
    this.disponibleForm = this.formbuilder.group(
      {
        data_ini: [new Date(), Validators.required],
        motiu: [0, Validators.required],
      },
      {
        validator: [DataValidator.dataValidator, MotiuValidator.motiuValidator],
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.disponibleForm.valid) {
      this.store.dispatch(
        PeriodeDisponibleAction.createPeriodeDisponible({
          periodeDisponible: this.disponibleForm.value,
        })
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
}
