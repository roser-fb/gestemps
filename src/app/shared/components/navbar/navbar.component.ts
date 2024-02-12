import { Component, OnInit } from '@angular/core';
import { faUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
 faUser = faUser;
 faCalendarDays = faCalendarDays;
 faArrowRightFromBracket = faArrowRightFromBracket;
 public usuariAutenticat:boolean=false;
  constructor(private userStoreService: UserStoreService) {

  }


  haIniciatSessio() {
    this.usuariAutenticat = this.userStoreService.isUsuariAutenticat();
    return this.usuariAutenticat;
  }
}
