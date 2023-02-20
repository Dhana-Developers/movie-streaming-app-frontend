import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from 'src/app/projects/api/service/themoviedb.service';

@Component({
  selector: 'app-subsciptions',
  templateUrl: './subsciptions.page.html',
  styleUrls: ['./subsciptions.page.scss'],
})
export class SubsciptionsPage implements OnInit {

  subsContainer:any = [];
  constructor(private service: ThemoviedbService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getSubs().subscribe(resp => {
      this.subsContainer = resp.subs;
    });
  }
}
