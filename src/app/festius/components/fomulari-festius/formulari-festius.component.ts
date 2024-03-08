import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import { findIndex } from "rxjs";
import { PeriodeFestiusService } from "src/app/festius/services/periode-festius.service";
import {
  DataValidator,
  MotiuValidator,
} from "src/app/shared/validadors/data-validator";

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
  constructor(
    private formbuilder: FormBuilder,
    private periodeFestiusService: PeriodeFestiusService
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
      console.log(this.festiusForm.value);
      this.periodeFestiusService.create(this.festiusForm.value).subscribe(
        (result: any) => {
          this.message = result.msg;
          this.creaFormulari();
          this.periodeFestiusService.triggerSubmitEvent();
        },
        (err) => {
          this.message = err.error.msg;
        }
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
}
