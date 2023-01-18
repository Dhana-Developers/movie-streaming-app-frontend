import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ThemoviedbService } from '../../api/service/themoviedb.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  @Input() genreMoviesContainer: any;
  @Input() genre: any;

  constructor(private service: ThemoviedbService) { }

  ngOnInit() {}

  cardEventListener(modelItem: any) {
    forkJoin([this.service.movieDetail(modelItem.id),
    this.service.castList(modelItem.id),
    this.service.crewList(modelItem.id),
    this.service.movieRating(modelItem.id),
    this.service.getVideoList(modelItem.id)]).subscribe(responseE1 => {
      modelItem.detailResponseE1 = responseE1[0];
      modelItem.castResponseE1 = responseE1[1];
      modelItem.crewResponseE1 = responseE1[2];
      modelItem.ratingResponse = responseE1[3];
      modelItem.videoResponse = responseE1[4];
      
      console.log(responseE1)
      this.service.presentModal(modelItem);
    });
  }

}
