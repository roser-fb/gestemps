import { NgModule, isDevMode } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CalendariModule } from "./calendari/calendari.module";
import { FestiusModule } from "./festius/festius.module";
import { GuardiesModule } from "./guardies/guardies.module";
import { UserModule } from "./user/user.module";
import { VacancesModule } from "./vacances/vacances.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FitxarModule } from "./fitxar/fitxar.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    CalendariModule,
    FestiusModule,
    GuardiesModule,
    UserModule,
    AuthModule,
    VacancesModule,
    FitxarModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
