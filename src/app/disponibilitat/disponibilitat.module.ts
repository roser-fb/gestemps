import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResumDispComponent } from "./components/resum-disp/resum-disp.component";
import { FormulariDispComponent } from "./components/formulari-disp/formulari-disp.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppComponent } from "../app.component";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { PeriodeVacancesService } from "../vacances/services/periode-vacances.service";

@NgModule({
  declarations: [ResumDispComponent, FormulariDispComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    PeriodeVacancesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class DisponibilitatModule {}
