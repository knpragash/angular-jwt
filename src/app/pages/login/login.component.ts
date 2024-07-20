import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private jwtHelper = new JwtHelperService();
  private username!: string;

  loginObj: any = {
    email: '',
    password: '',
  };

  registerObj: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.http
      .post('http://localhost:8080/register', this.registerObj).subscribe(
        (response: any) => {
          localStorage.setItem('loginTOken', response.token);
          this.username = this.jwtHelper.decodeToken(response.token).firstName;
          // alert(this.username + ', ' + this.jwtHelper.decodeToken(response.token).sub);
          this.router.navigateByUrl('/dashboard');
        },
        (errorResponse: any) => {
          alert(errorResponse.error.errorMessage + ", " + errorResponse.error.errorCode + ", " + errorResponse.status);
              // this.router.navigateByUrl('/dashboard');
        }
      )
  }

  onLogin() {
    // debugger;
    this.http
      .post('http://localhost:8080/login', this.loginObj)
      .subscribe((resp: any) => {
        console.log('Login: ' + resp.id + ', ' + resp.token);
      });
    // this.http.post('https://freeapi.miniprojectideas.com/api/User/Login', this.loginObj).subscribe((res:any)=>{
    //   if(res.result) {
    //     alert('login Success');
    //     localStorage.setItem('loginTOken', res.data.token);
    //     this.router.navigateByUrl('/dashboard');
    //   } else {
    //     alert(res.message);
    //   }
    // })
  }
}
