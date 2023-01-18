import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.scss'],
})
export class ErrormessageComponent implements OnInit {
  @Input() message!: string;

  constructor() { }

  ngOnInit() {}

}
