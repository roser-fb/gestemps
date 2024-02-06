import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm!: FormGroup; 
  public submitted = false;
  public message = null;
  constructor(private formbuilder: FormBuilder,private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.creaFormulari();
  }
  creaFormulari(){
    this.registerForm = this.formbuilder.group({
      username:[null, Validators.required],  
      password:[null, [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$")]]
    
    });
  }
  onSubmit() { 
    this.submitted=true;
    if(this.registerForm.valid){ 
      this.userService.register(this.registerForm.value).subscribe((result: any) => {
        this.message = result.msg;
        this.router.navigate(['/login']);
      }, (err) => {
        this.message = err.error.msg;
      });  
    }else{
      console.log("El formulari és invàlid");
    }
  }
}
