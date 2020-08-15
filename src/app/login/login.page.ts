import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginImg: string = "./assets/img/paper.png";
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.authService.login(form.value.email, form.value.password)
      .subscribe(data => {
        console.log('logged in');
      }, err => {
        console.error(err);
      }, async () => {
        await this.navCtrl.navigateRoot('/tabs/tab1');
      })
  }

}
