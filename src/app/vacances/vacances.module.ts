import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy } from "@angular/common";
import { FormulariDiesComponent } from "./components/formulari-dies/formulari-dies.component";
import { ResumDiesComponent } from "./components/resum-dies/resum-dies.component";
import { VacancesComponent } from "./components/pagina/vacances.component";
import { CalculaDiesPipe } from "./pipes/calcula-dies.pipe";
import { AppComponent } from "../app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppInterceptor } from "../shared/services/app.interceptor";

@NgModule({
  declarations: [
    FormulariDiesComponent,
    ResumDiesComponent,
    VacancesComponent,
    CalculaDiesPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: { HTTP_INTERCEPTORS, LocationStrategy },
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class VacancesModule {}
