import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profilepopover',
  templateUrl: './profilepopover.component.html',
  styleUrls: ['./profilepopover.component.scss'],
})
export class ProfilepopoverComponent implements OnInit {
  data: any = [];

  constructor(private pop: PopoverController) { }

  ngOnInit() {}

  viewProfile() {
    return this.pop.dismiss(this.data,'profile');
  }

  logout() {
    return this.pop.dismiss(this.data,'logout');
  }
}
