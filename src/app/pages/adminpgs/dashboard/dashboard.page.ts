import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/projects/api/service/authservice.service';
import { ThemoviedbService } from 'src/app/projects/api/service/themoviedb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  moviesCnt!: number;
  popularCnt!: number;
  genresCnt!: number;
  users!: any;
  subscriptons!: any;

  constructor(private service: ThemoviedbService,
    private authService: AuthService) { }

  ngOnInit() {
    this.movies();
    this.popular();
    this.genres();
    this.user();
    this.premium();
  }

  movies() {
    this.service.allMovies().subscribe(resp =>{
      this.moviesCnt = resp.length;
    })
  }

  popular() {
    this.service.popularList().subscribe(resp => {
      this.popularCnt = resp.length;
    })
  }

  genres() {
    this.service.genreList().subscribe(resp =>{
      this.genresCnt = resp.length;
    })
  }

  user() {
    this.authService.getUsers().subscribe(resp =>{
      console.log(resp);
      this.users = resp.resp;
    })
  }

  premium() {
    this.service.getSubs().subscribe(resp =>{
      console.log(resp);
      this.subscriptons = resp;
    })
  }

}
