import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from 'src/app/projects/api/service/themoviedb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movieContainer:any = [];
  constructor(private service: ThemoviedbService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.service.allMovies().subscribe(resp => {
      this.movieContainer = resp;
    })
  }

}
