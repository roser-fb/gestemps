import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthStoreService } from "./services/auth-store.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "../app.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthStoreService, AuthService],
  bootstrap: [AppComponent],
})
export class AuthModule {}
