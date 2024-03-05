import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy } from "@angular/common";
import { CalendariComponent } from "./pagina/calendari.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppComponent } from "../app.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { CalendariService } from "./services/calendari.service";

@NgModule({
  declarations: [CalendariComponent],
  imports: [CommonModule, FullCalendarModule],
  providers: [
    CalendariService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class CalendariModule {}
