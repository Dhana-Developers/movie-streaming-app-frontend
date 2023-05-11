import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { ThemoviedbService } from 'src/app/projects/api/service/themoviedb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movieContainer:any = [];
  searchResult:any = [];
  selectedFieldValue: any;
  itemTextField1 = 'release_date';
  queryParamTitle:boolean = false;
  queryParamDate:boolean = true;

  constructor(private service: ThemoviedbService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.service.allMovies().subscribe(resp => {
      this.movieContainer = resp;
    })
  }

  leaf = (obj: any) => 
    this.selectedFieldValue.split('.').reduce((value: any, el: any) => value[el], obj);

  leaf1 = (obj: any) =>
    this.itemTextField1.split('.').reduce((value, el) => value[el], obj) ;
    
  
  filter(event: SearchbarCustomEvent) {
    const filter = event.detail.value?.toLocaleLowerCase();
    console.log(filter);
    if (filter === '') {
      this.searchResult = [];
    }
    // if (this.queryParamTitle) {
      this.searchResult = this.movieContainer.filter((item: any) => 
      this.leaf(item).toLowerCase().indexOf(filter) >=0);
    // } else if (this.queryParamDate){
      // this.searchResult = this.movieContainer.filter((item: any) => 
      // this.leaf1(item).toLowerCase().indexOf(filter) >=0);
    // }
  }

  fieldSelectionChanged(fieldEvent: any) {
    const field = fieldEvent.detail.value;
    this.selectedFieldValue = field;
  }
}
