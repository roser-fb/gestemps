import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestiusComponent } from './components/pagina/festius.component';
import { ResumFestiusComponent } from './components/resum-festius/resum-festius.component';
import { FormulariFestiusComponent } from './components/fomulari-festius/formulari-festius.component';
import { OrdenaDirective } from './directiva/ordena.directive';
import { DiaSetmanaPipe } from './pipes/dia-setmana.pipe';
import { TipusFestiuPipe } from './pipes/tipus-festiu.pipe';
import { NextYearPipe } from './pipes/next-year.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    ResumFestiusComponent,
    TipusFestiuPipe,
    FormulariFestiusComponent,
    FestiusComponent,
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
  bootstrap: [AppComponent],
})
export class FestiusModule {}
