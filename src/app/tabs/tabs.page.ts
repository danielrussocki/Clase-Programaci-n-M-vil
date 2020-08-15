import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter(){
    this.authService.getToken().then(() => {
      if(!this.authService.isLoggedIn){
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

}
