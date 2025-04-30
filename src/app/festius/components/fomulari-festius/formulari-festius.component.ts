import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { findIndex, map, Observable } from "rxjs";
import { PeriodeFestiusService } from "src/app/festius/services/periode-festius.service";
import {
  DataValidator,
  MotiuValidator,
} from "src/app/shared/validadors/data-validator";
import * as PeriodeFestiusAction from "../../actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
@Component({
  selector: "app-formulari-festius",
  templateUrl: "./formulari-festius.component.html",
  styleUrls: ["./formulari-festius.component.css"],
})
export class FormulariFestiusComponent {
  public festiusForm!: FormGroup;
  public num_dies: number = 0;
  public submitted = false;
  public message = null;

  periode$ = this.store
    .select("periodeFestius")
    .pipe(map(({ periode }) => periode));

  responseOK$: Observable<boolean | null> = this.store
    .select("periodeFestius")
    .pipe(map(({ responseOK }) => responseOK));

  error$: Observable<any> = this.store
    .select("periodeFestius")
    .pipe(map(({ error }) => error));

  constructor(
    private formbuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.creaFormulari();
  }
  creaFormulari() {
    this.festiusForm = this.formbuilder.group(
      {
        data_ini: [new Date(), Validators.required],
        motiu: [0, Validators.required],
        fix: [],
      },
      {
        validator: [DataValidator.dataValidator, MotiuValidator.motiuValidator],
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.festiusForm.valid) {
      if (this.festiusForm.value.fix == 1) {
        this.festiusForm.value.fix = 0;
      } else {
        this.festiusForm.value.fix = 1;
      }
      this.store.dispatch(
        PeriodeFestiusAction.createPeriodeFestius({
          periode: this.festiusForm.value,
        })
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
}
