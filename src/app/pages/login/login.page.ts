import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { LoginPageForm } from './login.page.form';
import { logIn, loginFail, loginSucccess } from 'src/app/store/login/login.actions';
import { Subscription } from 'rxjs';
import { hide, show } from 'src/app/store/loading/Loading.Actions';
import { LoginState } from 'src/app/store/login/LoginState';
import { AuthService } from 'src/app/projects/api/service/authservice.service';
import { User } from 'src/app/model/user/User';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/projects/api/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: any;
  loginStateSubscription!: Subscription;
  loginSate!: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private auth: AuthService,
    private storage: StorageService,
    private toastCtrl: ToastController) {
    this.form = FormGroup;
   }

  async ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()
    //this.store.dispatch(logIn())
    await this.storage.get('isLoggedIn').then(value => {
      console.log(value);
      if (value) {
        this.onIsLoggedIn();
      }else {
        this.store.dispatch(hide());
      }
    })
      
    
  }

  ngOnDestroy(): void {
      if (this.loginStateSubscription) {
        this.loginStateSubscription.unsubscribe();
      }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn() {
    // this.store.dispatch(show());
    this.router.navigate(['tabs', 'popular'])
  }

  async login() {
    this.store.dispatch(show());
    let user = {
      'username': this.form.get('username').value,
      'password': this.form.get('password').value
    }
    
    await this.auth.signin(user).subscribe((resp) => {
      // console.log(user);
      
      console.log(resp);
      if (resp.code == 1) {
        let error = {message: resp.msg};
        this.store.dispatch(loginFail({error}));
        this.store.dispatch(hide());
      } else {
        const user = new User();
        user.username = resp.username;
        user.id = resp.id;
        user.subscription = resp.subscription;
        user.usertype = resp.usertype;
        // this.store.dispatch(loginSucccess({user}));
        this.storage.set('user', user);
        this.storage.set('isLoggedIn', true);
        // this.store.dispatch(hide());
        this.router.navigate(['tabs', 'popular']);
      }
      
    });
    
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toast = await this.toastCtrl.create({
        position: "middle",
        message: loginState.error.message,
        color: "danger",
        duration: 500
      });
      await toast.present()
    }
  }

  // login() {
  //   this.store.dispatch(logIn())

  //   // this.router.navigate(['tabs', 'popular'])
  // }

  register() {
    this.router.navigate(['register'])
  }
}
