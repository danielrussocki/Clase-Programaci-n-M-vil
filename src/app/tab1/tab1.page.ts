import { Component } from '@angular/core';
import { ActionSheetController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { RegularNoteComponent } from '../modales/regular-note/regular-note.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  logo: string = "./assets/img/paper.png";
  items = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public routerOutlet: IonRouterOutlet
  ) {}

  async addNote(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Añadir',
      buttons: [{
        text: 'Nueva nota',
        icon: 'create-outline',
        handler: () => {
          this.regularNote();
        }
      },{
        text: 'Lista de tareas',
        icon: 'checkbox-outline',
        handler: () => {
          console.log('Añadiendo lista de tareas');
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
        }
      }]
    });
    await actionSheet.present();
  }

  async regularNote(){
    const modal = await this.modalController.create({
      component: RegularNoteComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

}
