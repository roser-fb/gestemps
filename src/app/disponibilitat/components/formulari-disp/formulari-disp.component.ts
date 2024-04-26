import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  DataValidator,
  MotiuValidator,
} from "../../../shared/validadors/data-validator";
import { DisponibleService } from "../../services/disponible.service";
import * as moment from "moment";

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
  constructor(
    private formbuilder: FormBuilder,
    private disponibleService: DisponibleService
  ) {
    this.creaFormulari();
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
      this.disponibleService.create(this.disponibleForm.value).subscribe(
        (result: any) => {
          this.message = result.msg;
          this.creaFormulari();
          this.disponibleService.triggerSubmitEvent();
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
