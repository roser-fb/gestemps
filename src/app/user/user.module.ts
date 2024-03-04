import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { ManageComponent } from "./components/manage/manage.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { UserStoreService } from "./services/user-store.service";
import { UserService } from "./services/user.service";
import { LocationStrategy } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { AppComponent } from "../app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProfileComponent } from "./components/profile/profile.component";

@NgModule({
  declarations: [
    LoginComponent,
    ManageComponent,
    LogoutComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    UserStoreService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class UserModule {}
