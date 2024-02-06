import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserStoreService } from './services/user-store.service';
import { UserService } from './services/user.service';
import { LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor } from '../shared/services/app.interceptor';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ 
    UserStoreService,
    UserService,
    {
      provide: {HTTP_INTERCEPTORS, LocationStrategy},
      useClass: AppInterceptor,
      multi: true
    }],
    bootstrap: [AppComponent]
})
export class UserModule { }
