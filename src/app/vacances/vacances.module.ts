import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy } from "@angular/common";
import { FormulariDiesComponent } from "./components/formulari-dies/formulari-dies.component";
import { ResumDiesComponent } from "./components/resum-dies/resum-dies.component";

import { CalculaDiesPipe } from "./pipes/calcula-dies.pipe";
import { AppComponent } from "../app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { PeriodeVacancesService } from "./services/periode-vacances.service";

@NgModule({
  declarations: [FormulariDiesComponent, ResumDiesComponent, CalculaDiesPipe],
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
export class VacancesModule {}
