import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/projects/api/service/authservice.service';
import { ErrormessageComponent } from 'src/app/projects/component/errormessage/errormessage.component';
import { RegisterPageForm } from './register.page.form';
import { hide, show } from 'src/app/store/loading/Loading.Actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form!: any;
  errors!: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private store: Store<AppState>,
    private toastCtrl: ToastController) {
    this.form = FormGroup;
   }

  ngOnInit() {
    this.store.dispatch(hide());
    this.form = new RegisterPageForm(this.formBuilder).createForm();
  }

  private async onError(error: any) {
    const toast = await this.toastCtrl.create({
      position: "middle",
      message: error.msg,
      color: "danger",
      duration: 500
    });
    await toast.present()
  }

  private async onSuccess(success: any) {
    const toast = await this.toastCtrl.create({
      position: "middle",
      message: success.msg,
      color: "success",
      duration: 700
    });
    await toast.present()
  }

  async register() {
    if (this.form.get('password').value !== this.form.get('confirmpassword').value){
      this.errors = true;
    } else {
      this.store.dispatch(show())
      let user = {
        'username': this.form.get('username').value,
        'email': this.form.get('email').value,
        'password': this.form.get('password').value
      }
      // const username = this.form.get('username')
      // const email = this.form.get('email')
      // const password = this.form.get('password')
      await this.auth.register(user).subscribe(resp =>{
        console.log(user);
        
        console.log(resp)
        if (resp.code === 0) {
          // this.store.dispatch(hide());
          this.router.navigate(['login']);
          this.onSuccess(resp)
        }else {
          this.store.dispatch(hide());
          this.onError(resp);
        }
      });
    }
    
  }  
}
