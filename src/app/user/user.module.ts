import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageComponent } from "./components/manage/manage.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { UserService } from "./services/user.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppInterceptor } from "../shared/services/app.interceptor";
import { AppComponent } from "../app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProfileComponent } from "./components/profile/profile.component";

import { PopoverDirective } from "../shared/directives/popover.directive";
import { NewPasswordPipe } from "./pipes/newpassword.pipe";
import { RegisterFormComponent } from "./components/register-form/register-form.component";

@NgModule({
  declarations: [
    ManageComponent,
    LogoutComponent,
    ProfileComponent,
    PopoverDirective,
    NewPasswordPipe,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
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
