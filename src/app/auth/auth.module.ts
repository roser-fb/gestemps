import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "./services/auth-store.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "../app.component";
import { LoginComponent } from "./components/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from "../app-routing.module";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [AuthStoreService, AuthService],
  bootstrap: [AppComponent],
})
export class AuthModule {}
