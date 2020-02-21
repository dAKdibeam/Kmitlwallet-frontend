import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public authService: AuthService , private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document,
  private router: Router) {}

  Alert:string;

  ngOnInit () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (this.authService.getUserId() != null) {
      this.router.navigate(['/balance']);
      // window.location.reload(true);
      // location.reload();
    }

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid ){
      //return alert("Username or Password Incorrect!");
      this.Alert = "Please enter Username and Password";
    }
    else if( !form.value.username.match(/^([a-z0-9])+$/i) || !form.value.password.match(/^([a-z0-9])+$/i) || form.value.username.length<6 || form.value.username.length>12 || form.value.password.length<6 || form.value.password.length>12 ){
      this.Alert = "Username or Password Incorrect!";
    }else{
      this.authService.login(form.value.username, form.value.password);
    }
    
  }

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.createUser(
      form.value.Account,
      form.value.upUsername,
      form.value.upPassword,
      form.value.Firstname,
      form.value.Lastname,
      form.value.email);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
