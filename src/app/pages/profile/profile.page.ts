import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/projects/api/service/authservice.service';
import { StorageService } from 'src/app/projects/api/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userid: any;
  username: any;
  email: any;
  plan: any;
  subDate: any;
  expDate: any;
  isActive!: boolean;

  constructor(private storage: StorageService,
    private service: AuthService) { }

  ngOnInit() {
    this.storage.get('user').then(val =>{
      this.userid = val.id;
      this.userProfile(this.userid);
    });
    
  }

  userProfile(id: any){
    this.service.getUser(id).subscribe(resp => {
      this.username = resp.username;
      this.email = resp.email;
      this.plan = resp.plan;
      this.subDate = resp.sub_date;
      this.expDate = resp.exp_date;
      this.isActive = resp.active;
    })
  }

}
