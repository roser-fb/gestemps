import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy } from "@angular/common";

import { ResumFestiusComponent } from "./components/resum-festius/resum-festius.component";
import { FormulariFestiusComponent } from "./components/fomulari-festius/formulari-festius.component";
import { OrdenaDirective } from "./directiva/ordena.directive";
import { DiaSetmanaPipe } from "./pipes/dia-setmana.pipe";
import { TipusFestiuPipe } from "./pipes/tipus-festiu.pipe";
import { NextYearPipe } from "./pipes/next-year.pipe";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppComponent } from "../app.component";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { PeriodeFestiusService } from "./services/periode-festius.service";

@NgModule({
  declarations: [
    ResumFestiusComponent,
    TipusFestiuPipe,
    FormulariFestiusComponent,

    OrdenaDirective,
    NextYearPipe,
    DiaSetmanaPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    PeriodeFestiusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class FestiusModule {}
