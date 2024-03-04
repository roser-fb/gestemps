import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendariComponent } from "./calendari/pagina/calendari.component";
import { FestiusComponent } from "./festius/components/pagina/festius.component";
import { GuardiesComponent } from "./guardies/components/pagina/guardies.component";
import { AuthGuard } from "./user/guards/auth.guard";
import { HasRoleGuard } from "./user/guards/has-role.guard";
import { LoginComponent } from "./user/components/login/login.component";
import { LogoutComponent } from "./user/components/logout/logout.component";
import { ManageComponent } from "./user/components/manage/manage.component";
import { VacancesComponent } from "./vacances/components/pagina/vacances.component";
import { ResumFitxarComponent } from "./fitxar/components/resum-fitxar/resum-fitxar.component";

const routes: Routes = [
  { path: "", component: CalendariComponent, canActivate: [AuthGuard] },
  { path: "vacances", component: VacancesComponent, canActivate: [AuthGuard] },
  { path: "festius", component: FestiusComponent, canActivate: [AuthGuard] },
  { path: "guardies", component: GuardiesComponent, canActivate: [AuthGuard] },
  { path: "fitxar", component: ResumFitxarComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  {
    path: "manage",
    component: ManageComponent,
    canActivate: [HasRoleGuard],
    data: {
      allowedRoles: ["Admin"],
    },
  },
  { path: "logout", component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
