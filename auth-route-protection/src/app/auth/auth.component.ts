import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone:false,
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor (private authService:AuthService, 
    private router: Router){}
  isLoginMode = true;
  isLoading = false;
  error:string = '';

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
  const email =form.value.email;
  const password = form.value.password;
  let authObs: Observable<AuthResponseData>
  this.isLoading = true;

if(this.isLoginMode){
  authObs = this.authService.login(email,password)
} else{
  authObs = this.authService.signup(email,password)
}
authObs.subscribe(
  resData =>{
  console.log(resData);
  this.isLoading = false;
  this.router.navigate(['./recipes']);
  },
  errorMessage => {
    console.log(errorMessage); 
    this.error = errorMessage;
    this.isLoading = false;
  }
);
    form.reset();
  }
}
