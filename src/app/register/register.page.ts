import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerImg: string = "./assets/img/paper.png";
  constructor() { }

  ngOnInit() {
  }

}
