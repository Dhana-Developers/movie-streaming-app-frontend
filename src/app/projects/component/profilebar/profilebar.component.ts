import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { timeStamp } from 'console';
import { StorageService } from '../../api/service/storage.service';
import { ProfilepopoverComponent } from '../profilepopover/profilepopover.component';

@Component({
  selector: 'app-profilebar',
  templateUrl: './profilebar.component.html',
  styleUrls: ['./profilebar.component.scss'],
})
export class ProfilebarComponent implements OnInit {
  user: any;
  isLoggedIn: boolean = false;
  username: any;

  constructor(private storage: StorageService,
    private popoverController: PopoverController,
    private router: Router) { }

  ngOnInit() {
    this.storage.get('isLoggedIn').then(resp => {
      this.isLoggedIn = resp;
    });

    this.storage.get('user').then(val => {
      this.user = val;
      this.username = this.user.username;
    }, err => {
      console.log('not logged in:', err);
      
    });
    
  }

  async presentPopover(e: Event){
    const popover = await this.popoverController.create({
      component: ProfilepopoverComponent,
      event: e,
    });

    await popover.present();

    const { data, role } = await popover.onWillDismiss();
    // console.log(role);
    
    if (role === 'profile') {
      this.router.navigate(['profile']);
    } else if(role === 'logout') {
      this.storage.remove('isLoggedIn');
      this.storage.remove('user');
      this.router.navigate(['home']);
    }
  }


}
