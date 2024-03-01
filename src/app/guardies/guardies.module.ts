import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy } from "@angular/common";
import { FormulariGuardiesComponent } from "./components/formulari-guardies/formulari-guardies.component";
import { GuardiesComponent } from "./components/pagina/guardies.component";
import { ResumGuardiesComponent } from "./components/resum-guardies/resum-guardies.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppComponent } from "../app.component";
import { AnteriorPipe } from "./pipes/anterior.pipe";
import { AppInterceptor } from "../shared/services/app.interceptor";

@NgModule({
  declarations: [
    FormulariGuardiesComponent,
    GuardiesComponent,
    ResumGuardiesComponent,
    AnteriorPipe,
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
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class GuardiesModule {}
