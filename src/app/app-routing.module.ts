import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendariComponent } from "./calendari/pagina/calendari.component";
import { ResumFestiusComponent } from "./festius/components/resum-festius/resum-festius.component";
import { ResumGuardiesComponent } from "./guardies/components/resum-guardies/resum-guardies.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { HasRoleGuard } from "./auth/guards/has-role.guard";
import { LoginComponent } from "./auth/components/login/login.component";
import { LogoutComponent } from "./user/components/logout/logout.component";
import { ManageComponent } from "./user/components/manage/manage.component";
import { ResumDiesComponent } from "./vacances/components/resum-dies/resum-dies.component";
import { ResumFitxarComponent } from "./fitxar/components/resum-fitxar/resum-fitxar.component";
import { Role } from "./user/models/roles.dto";
import { ProfileComponent } from "./user/components/profile/profile.component";

const routes: Routes = [
  { path: "", component: CalendariComponent, canActivate: [AuthGuard] },
  { path: "vacances", component: ResumDiesComponent, canActivate: [AuthGuard] },
  {
    path: "festius",
    component: ResumFestiusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "guardies",
    component: ResumGuardiesComponent,
    canActivate: [AuthGuard],
  },
  { path: "fitxar", component: ResumFitxarComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "manage",
    component: ManageComponent,
    //    canActivate: [AuthGuard, HasRoleGuard],
    canActivate: [AuthGuard],
    data: {
      allowedRoles: [Role.Admin],
    },
  },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
