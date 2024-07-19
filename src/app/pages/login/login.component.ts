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
      .post('http://localhost:8080/register', this.registerObj)
      .subscribe({
        next: (resp: any) => {
          alert('Resp: ' + resp);
          localStorage.setItem('loginTOken', resp.token);
          this.username = this.jwtHelper.decodeToken(resp.token).firstName;
          alert(
            this.username + ', ' + this.jwtHelper.decodeToken(resp.token).sub
          );
          //     this.router.navigateByUrl('/dashboard');
        },
        // error: (erResponse: HttpErrorResponse) => {
        //   alert('message: ' + erResponse.error.errorCode);
        //   alert('errorMessage: ' + erResponse.error.errorMessage);
        //   alert('name: ' + erResponse.error.apiPath);
        // },
        error: (error) => {
          alert(
            'mi: ' +
              error.error.errorMessage +
              ', ' +
              error.error.apiPath +
              ', ' +
              error.error.errorCode +
              ', ' +
              error.status
          );
        },
      });
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
