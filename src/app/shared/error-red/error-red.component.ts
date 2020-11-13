import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-red',
  templateUrl: './error-red.component.html',
  styleUrls: ['./error-red.component.css']
})
export class ErrorRedComponent implements OnInit {

  img: string;

  constructor() {
    this.img = 'assets/img/error.jpg';
  }

  ngOnInit(): void {


  }

}
