import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendariComponent } from './pagina/calendari.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    CalendariComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
  ],
  bootstrap: [AppComponent]
})
export class CalendariModule { }
