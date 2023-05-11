import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/projects/api/service/authservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  usersContainer:any = [];

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.allUsers();
  }

  allUsers() {
    this.service.getUsers().subscribe(resp =>{
      console.log(resp.resp);
      
      this.usersContainer = resp.resp.users;
    })
  }

}
