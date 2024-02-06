import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '../app.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FitxarComponent } from './components/fitxar/fitxar.component';
import { ResumFitxarComponent } from './components/resum-fitxar/resum-fitxar.component';
import { TmpsRestantPipe } from './pipes/tmps-restant.pipe';
import { DateFilterComponent } from './components/date-filter/date-filter.component';

@NgModule({
  declarations: [
    FitxarComponent,
    ResumFitxarComponent,
    TimeFormatPipe,
    TmpsRestantPipe,
    DateFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  bootstrap: [AppComponent],
})
export class FitxarModule {}
