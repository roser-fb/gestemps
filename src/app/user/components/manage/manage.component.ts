import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Role } from "../../models/roles.dto";
import { User } from "../../models/user.dto";
import { UserService } from "../../services/user.service";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent {
  public llista_usuaris$: Observable<User[]> = new Observable<User[]>();
  public registerForm!: FormGroup;
  public submitted = false;
  public message = null;
  public messagePassword: string | null = null;
  faTrashCan = faTrashCan;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.creaFormulari();
  }
  ngOnInit() {
    this.llista_usuaris$ = this.userService.getUser();
    this.userService.submitEvent.subscribe(() => {
      location.reload();
    });
  }

  creaFormulari() {
    this.registerForm = this.formbuilder.group({
      username: [null, Validators.required],
      mail: [null, Validators.required],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"),
        ],
      ],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
       this.userService.register(this.registerForm.value).subscribe(
        (result: any) => {
          this.message = result.msg;
        },
        (err) => {
          this.message = err.error.msg;
        }
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
  resetPassword(id: string) {
    const newPassword = this.randomPassword();
    this.userService.getUserById(id).subscribe((user) => {
      if (user) {
        user.password = newPassword;
        this.userService.updateUser(id, user);
      }
    });
    this.messagePassword =
      "La nova contrasenya és " + newPassword + " . Canvia-la al teu perfil";
  }

  randomPassword(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  esborra(id: string): void {
    this.userService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
        location.reload();
      }
    });
  }
  checkIfAdmin(role: Role){
    return role === Role.Admin;
  }
  changeRole(id:string){
    this.userService.getUserById(id).subscribe((user) => {
      if (user){
        if(user.role ==  Role.Admin) {
          user.role = Role.User;
        }
        else user.role = Role.Admin;
      this.userService.updateUser(id, user).subscribe((res) => {
        if (res.status == "ok") {
          location.reload();
        }
      });}
    });
  }

}
