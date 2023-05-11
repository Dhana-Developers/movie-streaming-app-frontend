import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/service/authservice.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
})
export class PasswordresetComponent implements OnInit {

  email: any;
  username: any;
  password: any;

  constructor(private auth: AuthService,
    private toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {}

  async resetPassword() {
    let info = {
      email: this.email,
      username: this.username,
      password: this.password
    }
    const toast1 = await this.toastCtrl.create({
      message: 'password reset successfully',
      duration: 1500,
      position: 'middle',
      color: 'success'
    });
    const toast2 = await this.toastCtrl.create({
      message: 'User not found',
      duration: 1500,
      position: 'middle',
      color: 'danger'
    });
    await this.auth.resetPass(info).subscribe(resp =>{
      console.log(resp);
      if (resp.code === 0){
        toast1.present();
        
        this.auth.dismissModel();
      }else {
        toast2.present();
      }
    })
  }

  closeModel(){
    this.auth.dismissModel();
  }

}
