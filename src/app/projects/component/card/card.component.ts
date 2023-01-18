import { Component, Input, OnInit, Output, EventEmitter,Renderer2 } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id!: string;
  @Input() title!: string;
  @Input() image!: string;
  @Input() model: any;
  @Output() cardEventTrigger: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  cardClickEventTrigger(model: any) {
    this.cardEventTrigger.emit(model);
  }

}
