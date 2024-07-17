import { HttpClient } from '@angular/common/http';
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
  private loggedInUsername!: string;

  loginObj: any = {
    EmailId: '',
    Password: '',
  };

  registerObj: any = {
    userName: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    // debugger;
    this.http
      .post('http://localhost:8080/register', this.registerObj)
      .subscribe((resp: any) => {
        console.log('Register: ' + resp.firstName);
        localStorage.setItem('loginTOken', resp.token);

        this.loggedInUsername = this.jwtHelper.decodeToken(
          resp.token
        ).firstName;
        alert(
          this.loggedInUsername +
            ', ' +
            this.jwtHelper.decodeToken(resp.token).sub
        );
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
