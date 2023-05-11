import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { ThemoviedbService } from 'src/app/projects/api/service/themoviedb.service';

@Component({
  selector: 'app-subsciptions',
  templateUrl: './subsciptions.page.html',
  styleUrls: ['./subsciptions.page.scss'],
})
export class SubsciptionsPage implements OnInit {

  subsContainer:any = [];
  searchResult:any = [];
  selectedFieldValue: any;

  constructor(private service: ThemoviedbService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getSubs().subscribe(resp => {
      this.subsContainer = resp.subs;
    });
  }

  leaf = (obj: any) => 
    this.selectedFieldValue.split('.').reduce((value: any, el: any) => value[el], obj);

  filter(event: SearchbarCustomEvent) {
    this.searchResult = [];
    const filter = event.detail.value?.toLocaleLowerCase();
    console.log(filter);
    
    // if (this.queryParamTitle) {
      this.searchResult = this.subsContainer.filter((item: any) => 
      this.leaf(item).toLowerCase().indexOf(filter) >=0);
    // } else if (this.queryParamDate){
      // this.searchResult = this.movieContainer.filter((item: any) => 
      // this.leaf1(item).toLowerCase().indexOf(filter) >=0);
    // }
  }

  fieldSelectionChanged(fieldEvent: any) {
    this.searchResult = [];
    const field = fieldEvent.detail.value;
    this.selectedFieldValue = field;
  }
}
