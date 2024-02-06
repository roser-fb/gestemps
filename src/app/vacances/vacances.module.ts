import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariDiesComponent } from './components/formulari-dies/formulari-dies.component';
import { ResumDiesComponent } from './components/resum-dies/resum-dies.component';
import { VacancesComponent } from './components/pagina/vacances.component';
import { CalculaDiesPipe } from './pipes/calcula-dies.pipe';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    FontAwesomeModule
  ],
  bootstrap: [AppComponent]
})
export class VacancesModule { }
